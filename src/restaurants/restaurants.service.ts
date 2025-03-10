import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantRepository.create(createRestaurantDto);
  }

  findAll() {
    return this.restaurantRepository.find();
  }

  findOne(id: number) {
    return this.restaurantRepository.findOne({ where: { id } });
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantRepository.update(id, updateRestaurantDto);
  }

  remove(id: number) {
    return this.restaurantRepository.softDelete(id);
  }
}
