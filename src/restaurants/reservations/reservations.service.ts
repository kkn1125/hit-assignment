import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '@restaurants/menus/entities/menu.entity';
import { ReservationMenu } from '@restaurants/reservations/entities/reservation-menu.entity';
import { UtilService } from '@util/util.service';
import {
  Between,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { Protocol } from '@util/protocol';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(ReservationMenu)
    private readonly reservationMenuRepository: Repository<ReservationMenu>,
    private readonly utilService: UtilService,
  ) {}

  /* 
  1. 예약자 존재 여부를 검증한다.
  2. 예약자 전화번호 입력 없을 시 예약자 정보의 전화번호를 적용한다.
  3. 예약 인원 음수 입력을 방지한다.
  4. 예약 일자 과거 입력을 방지한다.
  5. 예약 종료일자는 시작일자보다 과거일 수 없다.
  */
  async create(
    user: UserTokenData,
    restaurantId: number,
    createReservationDto: CreateReservationDto,
  ) {
    const { phone } = createReservationDto;

    /* 입력 전화번호 없을 시 사용자 전화번호가 기본값 */
    if (!phone) {
      Object.assign(createReservationDto, { phone: user.phone });
    }

    const { menu, ...dtoData } = createReservationDto;

    const isOverlabTime = await this.reservationRepository.count({
      where: {
        reserveStartAt: Between(
          createReservationDto.reserveStartAt,
          createReservationDto.reserveEndAt,
        ),
        reserveEndAt: Between(
          createReservationDto.reserveStartAt,
          createReservationDto.reserveEndAt,
        ),
      },
    });

    if (isOverlabTime > 0) {
      const errorProtocol = Protocol.OverlabReserveTime;
      throw new BadRequestException(errorProtocol);
    }

    /* 예약 객체 미리 생성 */
    const reservation = this.reservationRepository.create({
      userId: user.id,
      restaurantId,
      ...dtoData,
    });

    await this.reservationRepository.save(reservation);

    /* 메뉴 데이터베이스 존재 검증 */
    for (const id of menu) {
      const menu = await this.utilService.throwNoExistsEntityWithSelectBy(
        this.menuRepository,
        {
          where: { id, restaurantId },
        },
      );

      const reservationMenu = new ReservationMenu();
      reservationMenu.menuId = menu.id;
      reservationMenu.reservationId = reservation.id;

      await this.reservationRepository.manager.save(reservationMenu);
    }

    return { id: reservation.id };
  }

  findAll(
    path: string,
    restaurantId: number,
    page: number,
    perPage: number,
    searchOption: SearchOption,
  ) {
    const { menuName, reserveStartAt, reserveEndAt, phone, amount } =
      searchOption;
    return this.utilService.searchPagination(
      this.reservationRepository,
      path,
      {
        where: {
          restaurantId,
          reservationMenus: {
            menu: {
              name: menuName ? Like('%' + menuName + '%') : undefined,
            },
          },
          phone: phone ? Like('%' + phone + '%') : undefined,
          reserveStartAt: reserveStartAt
            ? MoreThanOrEqual(reserveStartAt)
            : undefined,
          reserveEndAt: reserveEndAt
            ? LessThanOrEqual(reserveEndAt)
            : undefined,
          amount: amount ? Between(+amount[0], +amount[1]) : undefined,
        },
        take: perPage,
        skip: (page - 1) * perPage,
        select: {
          user: {
            id: true,
            userId: true,
            username: true,
            phone: true,
          },
        },
        relations: {
          user: true,
          restaurant: true,
          reservationMenus: {
            menu: true,
          },
        },
        order: {
          createdAt: 'DESC',
        },
      },
      page,
      perPage,
      searchOption,
    );
  }

  findOne(id: number) {
    return this.reservationRepository.findOneBy({ id });
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    const { menu, ...updateDto } = updateReservationDto;

    const reservation = await this.utilService.throwNoExistsEntityWithSelectBy(
      this.reservationRepository,
      { where: { id } },
    );

    /* 예약 겹침 검증 */
    const startAt =
      updateReservationDto.reserveStartAt ?? reservation.reserveStartAt;
    const endAt = updateReservationDto.reserveEndAt ?? reservation.reserveEndAt;
    const isNoUpdateTime =
      !updateReservationDto.reserveStartAt &&
      !updateReservationDto.reserveEndAt;

    if (!isNoUpdateTime) {
      const isOverlabTime = await this.reservationRepository.count({
        where: {
          reserveStartAt: Between(startAt, endAt),
          reserveEndAt: Between(startAt, endAt),
        },
      });

      if (isOverlabTime > 0) {
        const errorProtocol = Protocol.OverlabReserveTime;
        throw new BadRequestException(errorProtocol);
      }
    }

    if (menu) {
      await this.reservationMenuRepository.delete({ reservationId: id });

      for (const menuId of menu) {
        const reservationMenu = new ReservationMenu();
        reservationMenu.menuId = menuId;
        reservationMenu.reservationId = id;

        await this.reservationRepository.manager.save(reservationMenu);
      }
    }

    await this.reservationRepository.update(id, updateDto);
    return { id };
  }

  async remove(id: number) {
    await this.reservationRepository.softDelete(id);
    return { id };
  }
}
