import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { Menu } from '@restaurants/menus/entities/menu.entity';
import { User } from '@users/entities/user.entity';
import { UsersModule } from '@users/users.module';
import { ReservationMenu } from './entities/reservation-menu.entity';
import { Reservation } from './entities/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation,
      User,
      Menu,
      Restaurant,
      ReservationMenu,
    ]),
    UsersModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
