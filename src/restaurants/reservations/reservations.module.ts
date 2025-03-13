import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { User } from '@users/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Restaurant, User])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
