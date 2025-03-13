import { Roles } from '@auth/guard/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseSearchModel } from '@common/decorators/api.response.search.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { DEFAULT_PAGE, PER_PAGE } from '@common/variables/environment';
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
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UserRole } from '@util/enums/UserRole';
import { Request } from 'express';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { CheckOwnerGuard } from './guard/check-owner.guard';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @ApiResponseWithModel(
    {
      CreateRestaurantResponse: { id: 1 },
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/restaurants',
    },
  )
  @ApiBodyWithModel({ CreateRestaurantDto })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 정보 추가' })
  @Roles([UserRole.Shopkeeper])
  @Post()
  create(
    @Req() req: Request,
    @Body() createRestaurantDto: CreateRestaurantDto,
  ) {
    return this.restaurantsService.create(req.user.id, createRestaurantDto);
  }

  @ApiResponseSearchModel({ FindAllResponse: Restaurant }, '/restaurants', {
    page: 2,
    count: 10,
    total: 3,
  })
  @ApiQuery({ name: 'page', type: Number, example: DEFAULT_PAGE })
  @ApiQuery({ name: 'perPage', type: Number, example: PER_PAGE })
  @ApiOperation({ summary: '식당 전체 조회' })
  @Get()
  findAll(
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('perPage') perPage: number = PER_PAGE,
  ) {
    return this.restaurantsService.findAll(+page, +perPage);
  }

  @ApiResponseWithModel(
    { Restaurant },
    {
      ok: true,
      status: HttpStatus.OK,
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

  @ApiResponseWithModel(
    {
      UpdateRestaurantResponse: {
        id: 1,
      },
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'PATCH',
      path: '/restaurants/:restaurantId',
    },
  )
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
