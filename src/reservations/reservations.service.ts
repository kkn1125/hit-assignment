import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create(createReservationDto);
  }

  findAll() {
    return this.reservationRepository.find();
  }

  findOne(id: number) {
    return this.reservationRepository.findOne({ where: { id } });
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.update(id, updateReservationDto);
  }

  remove(id: number) {
    return this.reservationRepository.softDelete(id);
  }
}
