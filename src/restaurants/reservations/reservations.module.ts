import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from '@restaurants/menus/entities/menu.entity';
import { User } from '@users/entities/user.entity';
import { UsersModule } from '@users/users.module';
import { Reservation } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Restaurant } from '@restaurants/entities/restaurant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, User, Menu, Restaurant]),
    UsersModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
