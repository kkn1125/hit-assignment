import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RoleGuard } from '@auth/guard/role.guard';
import { Roles } from '@auth/guard/roles.decorator';
import { UserRole } from '@users/enums/UserRole';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(RoleGuard)
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

  @ApiOperation({ summary: '식당 상세 조회' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(+id);
  }

  @ApiOperation({ summary: '식당 정보 수정' })
  @Roles([UserRole.Shopkeeper])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantsService.update(+id, updateRestaurantDto);
  }

  @ApiOperation({ summary: '식당 삭제' })
  @Roles([UserRole.Shopkeeper])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(+id);
  }
}
