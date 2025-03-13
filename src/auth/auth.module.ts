import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Reservation])],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
