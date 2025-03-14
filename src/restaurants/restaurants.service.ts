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

  async create(userId: number, createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.restaurantRepository.save({
      userId,
      ...createRestaurantDto,
    });
    return { id: restaurant.id };
  }

  findAll(page: number, perPage: number) {
    return searchPagination(
      this.restaurantRepository,
      '/restaurants',
      {
        take: perPage,
        skip: (page - 1) * perPage,
      },
      page,
      perPage,
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

  async remove(id: number) {
    await this.restaurantRepository.softDelete(id);
    return { id };
  }
}
