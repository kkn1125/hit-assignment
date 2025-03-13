import { PickType } from '@nestjs/swagger';
import { Reservation } from '../entities/reservation.entity';

export class CreateReservationDto extends PickType(Reservation, [
  'reserveStartAt',
  'reserveEndAt',
  'amount',
]) {
  menu!: number[];
}
export class CreateReservationWithPhoneDto extends PickType(Reservation, [
  'reserveStartAt',
  'reserveEndAt',
  'phone',
  'amount',
]) {
  menu!: number[];
}
