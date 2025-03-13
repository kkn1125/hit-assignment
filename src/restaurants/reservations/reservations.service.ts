import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { searchPagination } from '@util/utilFunction';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(
    userId: number,
    restaurantId: number,
    createReservationDto: CreateReservationDto,
  ) {
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
