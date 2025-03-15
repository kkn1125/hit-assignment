import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '@restaurants/menus/entities/menu.entity';
import { ReservationMenu } from '@restaurants/reservations/entities/reservation-menu.entity';
import {
  searchPagination,
  throwNoExistsEntityWithSelectBy,
} from '@util/utilFunction';
import {
  Between,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
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

    /* 예약 객체 미리 생성 */
    const reservation = this.reservationRepository.create({
      userId: user.id,
      restaurantId,
      ...dtoData,
    });

    await this.reservationRepository.save(reservation);

    /* 메뉴 데이터베이스 존재 검증 */
    for (const id of menu) {
      const menu = await throwNoExistsEntityWithSelectBy(this.menuRepository, {
        where: { id },
      });

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
    return searchPagination(
      this.reservationRepository,
      path,
      {
        where: {
          restaurantId,
          phone: searchOption.phone
            ? Like('%' + searchOption.phone + '%')
            : undefined,
          reserveStartAt: searchOption.reserveStartAt
            ? MoreThanOrEqual(searchOption.reserveStartAt)
            : undefined,
          reserveEndAt: searchOption.reserveEndAt
            ? LessThanOrEqual(searchOption.reserveEndAt)
            : undefined,
          amount: searchOption.amount
            ? Between(+searchOption.amount[0], +searchOption.amount[1])
            : undefined,
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
          reservationMenus: true,
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

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.update(id, updateReservationDto);
  }

  async remove(id: number) {
    await this.reservationRepository.softDelete(id);
    return { id };
  }
}
