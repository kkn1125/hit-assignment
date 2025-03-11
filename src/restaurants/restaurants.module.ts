import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { MenusModule } from './menus/menus.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    RouterModule.register([
      { path: 'restaurants/:restaurantId', module: MenusModule },
      { path: 'restaurants/:restaurantId', module: ReservationsModule },
    ]),
    MenusModule,
    ReservationsModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
