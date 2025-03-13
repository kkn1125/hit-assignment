import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Protocol } from '@util/protocol';
import { searchPagination } from '@util/utilFunction';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant =
      await this.restaurantRepository.save(createRestaurantDto);
    return { id: restaurant.id };
  }

  findAll(page: number = 1, perPage: number = 10) {
    return searchPagination(
      this.restaurantRepository,
      '/restaurants',
      {
        take: perPage,
        skip: (page - 1) * perPage,
      },
      page,
    );
  }

  async findOne(id: number) {
    const restaurant = await this.restaurantRepository.findOneBy({ id });
    if (!restaurant) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol, {
        cause: '식당 정보를 찾을 수 없습니다.',
      });
    }
    return restaurant;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantRepository.update(id, updateRestaurantDto);
  }

  remove(id: number) {
    return this.restaurantRepository.softDelete(id);
  }
}
