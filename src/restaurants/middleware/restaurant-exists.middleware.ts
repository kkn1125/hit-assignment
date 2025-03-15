import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { UtilService } from '@util/util.service';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantExistsMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
    private readonly utilService: UtilService,
  ) {}

  async use(req: Request, _res, next: () => void) {
    const restaurantId = req.params.restaurantId;

    await this.utilService.throwNoExistsEntityWithSelectBy(this.repository, {
      where: { id: +restaurantId },
    });

    next();
  }
}
