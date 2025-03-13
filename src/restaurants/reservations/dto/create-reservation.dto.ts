import { PickType } from '@nestjs/swagger';
import { Reservation } from '../entities/reservation.entity';

export class CreateReservationDto extends PickType(Reservation, [
  'reserveStartAt',
  'reserveEndAt',
  'phone',
  'amount',
]) {}
