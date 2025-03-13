import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { throwNoExistsEntityWithSelectBy } from '@util/utilFunction';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantExistsMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
  ) {}

  async use(req: Request, _res, next: () => void) {
    const restaurantId = req.params.restaurantId;

    await throwNoExistsEntityWithSelectBy(this.repository, {
      id: +restaurantId,
    });

    next();
  }
}
