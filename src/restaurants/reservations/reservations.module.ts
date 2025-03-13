import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { UsersService } from '@users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, User])],
  controllers: [ReservationsController],
  providers: [ReservationsService, UsersService],
})
export class ReservationsModule {}
