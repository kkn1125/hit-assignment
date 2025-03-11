import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { MenusModule } from './menus/menus.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    RouterModule.register([
      { path: ':restaurantId', module: MenusModule },
      { path: ':restaurantId', module: ReservationsModule },
    ]),
    MenusModule,
    ReservationsModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
