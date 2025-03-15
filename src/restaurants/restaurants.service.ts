import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Protocol } from '@util/protocol';
import { UtilService } from '@util/util.service';
import { Like, Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly utilService: UtilService,
  ) {}

  async create(userId: number, createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.restaurantRepository.save({
      userId,
      ...createRestaurantDto,
    });
    return { id: restaurant.id };
  }

  findAll(
    path: string,
    page: number,
    perPage: number,
    searchOption: SearchOption,
  ) {
    return this.utilService.searchPagination(
      this.restaurantRepository,
      path,
      {
        take: perPage,
        skip: (page - 1) * perPage,
        where: {
          category: searchOption.category
            ? Like('%' + searchOption.category + '%')
            : undefined,
          name: searchOption.name
            ? Like('%' + searchOption.name + '%')
            : undefined,
          location: searchOption.location
            ? Like('%' + searchOption.location + '%')
            : undefined,
        },
      },
      page,
      perPage,
      searchOption,
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
