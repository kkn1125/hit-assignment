import { Roles } from '@auth/guard/roles.decorator';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserRole } from '@users/enums/UserRole';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @ApiOperation({ summary: '식당 정보 추가' })
  @Roles([UserRole.Shopkeeper])
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @ApiOperation({ summary: '식당 전체 조회' })
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @ApiResponseWithModel(Restaurant, {
    ok: true,
    status: 200,
    method: 'GET',
    path: '/restaurants/:restaurantId',
  })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiOperation({ summary: '식당 상세 조회' })
  @Get(':restaurantId')
  findOne(@Param('restaurantId') restaurantId: string) {
    return this.restaurantsService.findOne(+restaurantId);
  }

  @ApiOperation({ summary: '식당 정보 수정' })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @Roles([UserRole.Shopkeeper])
  @Patch(':restaurantId')
  update(
    @Param('restaurantId') restaurantId: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+restaurantId, updateRestaurantDto);
  }

  @ApiOperation({ summary: '식당 삭제' })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @Roles([UserRole.Shopkeeper])
  @Delete(':restaurantId')
  remove(@Param('restaurantId') restaurantId: string) {
    return this.restaurantsService.remove(+restaurantId);
  }
}
