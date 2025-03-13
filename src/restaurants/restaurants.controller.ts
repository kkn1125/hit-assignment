import { Roles } from '@auth/guard/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseSearchModel } from '@common/decorators/api.response.search.model';
import { ApiResponseWithCaseModel } from '@common/decorators/api.response.with.case.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UserRole } from '@util/enums/UserRole';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { CheckOwnerGuard } from './guard/check-owner.guard';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @ApiResponseWithCaseModel(
    {
      CreateRestaurantResponse: {
        '개별 추가': { id: 1 },
        '다중 추가': [{ id: 1 }],
      },
    },
    HttpStatus.CREATED,
    '/restaurants',
    'POST',
  )
  @ApiBodyWithModel({ CreateRestaurantDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 정보 추가' })
  @UseGuards(CheckOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @ApiResponseSearchModel({ FindAllResponse: Restaurant }, '/restaurants', {
    page: 2,
    total: 3,
    prev: 1,
    next: 3,
  })
  @ApiQuery({ name: 'page', type: Number, example: 1 })
  @ApiOperation({ summary: '식당 전체 조회' })
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.restaurantsService.findAll(+page, +perPage);
  }

  @ApiResponseWithModel(
    { Restaurant },
    {
      ok: true,
      status: 200,
      method: 'GET',
      path: '/restaurants/:restaurantId',
    },
  )
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiOperation({ summary: '식당 상세 조회' })
  @Get(':restaurantId')
  findOne(@Param('restaurantId') restaurantId: string) {
    return this.restaurantsService.findOne(+restaurantId);
  }

  @ApiBodyWithModel({ UpdateRestaurantDto: CreateRestaurantDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 정보 수정' })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @UseGuards(CheckOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Patch(':restaurantId')
  update(
    @Param('restaurantId') restaurantId: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+restaurantId, updateRestaurantDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 삭제' })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @UseGuards(CheckOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Delete(':restaurantId')
  remove(@Param('restaurantId') restaurantId: string) {
    return this.restaurantsService.remove(+restaurantId);
  }
}
