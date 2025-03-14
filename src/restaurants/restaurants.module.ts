import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import { Restaurant } from './entities/restaurant.entity';
import { MenusModule } from './menus/menus.module';
import { RestaurantExistsMiddleware } from './middleware/restaurant-exists.middleware';
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
    UsersModule,
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule implements NestModule {
  /* 식당 하위 도메인 예약, 메뉴 경로에서 식당 존재 여부를 검증 */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RestaurantExistsMiddleware)
      .forRoutes('restaurants/:restaurantId/*api');
  }
}
