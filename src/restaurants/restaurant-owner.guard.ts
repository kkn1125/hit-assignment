import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { Protocol } from '@util/protocol';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user.id;
    const restaurantId = +request.params.restaurantId;

    if (Number.isNaN(restaurantId)) {
      const errorProtocol = Protocol.WrongParamType;
      throw new BadRequestException(errorProtocol);
    }

    const restaurant = await this.restaurantRepository.findOneBy({
      id: restaurantId,
    });

    if (!restaurant) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol);
    }

    if (restaurant.userId !== userId) {
      const errorProtocol = Protocol.NoMatchOwnRestaurant;
      throw new BadRequestException(errorProtocol);
    }

    return true;
  }
}
