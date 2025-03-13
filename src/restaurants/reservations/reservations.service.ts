import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { Protocol } from '@util/protocol';
import {
  searchPagination,
  throwNoExistsEntityWithSelectBy,
} from '@util/utilFunction';
import dayjs from 'dayjs';
import { Repository } from 'typeorm';
import {
  CreateReservationDto,
  CreateReservationWithPhoneDto,
} from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /* 
  1. 예약자 존재 여부를 검증한다.
  2. 예약자 전화번호 입력 없을 시 예약자 정보의 전화번호를 적용한다.
  3. 예약 인원 음수 입력을 방지한다.
  4. 예약 일자 과거 입력을 방지한다.
  5. 예약 종료일자는 시작일자보다 과거일 수 없다.
  */
  // TODO: 메뉴(배열) 추가 로직
  async create(
    userId: number,
    restaurantId: number,
    createReservationDto: CreateReservationDto | CreateReservationWithPhoneDto,
  ) {
    const user = await throwNoExistsEntityWithSelectBy(this.userRepository, {
      id: userId,
    });

    if (!('phone' in createReservationDto)) {
      Object.assign(createReservationDto, { phone: user.phone });
    }

    if (createReservationDto.amount <= 0) {
      const errorProtocol = Protocol.MustPositive;
      throw new BadRequestException(errorProtocol);
    }

    if (dayjs(createReservationDto.reserveStartAt).isBefore(dayjs())) {
      const errorProtocol = Protocol.NotAllowedPastTime;
      throw new BadRequestException(errorProtocol);
    }

    if (
      dayjs(createReservationDto.reserveEndAt).isBefore(
        createReservationDto.reserveStartAt,
      )
    ) {
      const errorProtocol = Protocol.InvalidTimeRange;
      throw new BadRequestException(errorProtocol);
    }
    const reservation = await this.reservationRepository.save({
      userId,
      restaurantId,
      ...createReservationDto,
    });

    return { id: reservation.id };
  }

  findAll(restaurantId: number, page: number, perPage: number) {
    return searchPagination(
      this.reservationRepository,
      `/restaurants/${restaurantId}/reservations`,
      { where: { restaurantId }, take: perPage, skip: (page - 1) * perPage },
      page,
      perPage,
    );
  }

  findOne(id: number) {
    return this.reservationRepository.findOneBy({ id });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.update(id, updateReservationDto);
  }

  remove(id: number) {
    return this.reservationRepository.softDelete(id);
  }
}
