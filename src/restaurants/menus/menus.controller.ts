import { ApiBodyWithCaseModel } from '@common/decorators/api.body.with.case.model';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseWithCaseModel } from '@common/decorators/api.response.with.case.model';
import { DEFAULT_PAGE, PER_PAGE } from '@common/variables/environment';
import { Roles } from '@middleware/roles.decorator';
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
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { RestaurantOwnerGuard } from '@restaurants/restaurant-owner.guard';
import { UserRole } from '@util/enums/UserRole';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';
import { MenuDataParsePipe } from './menu-data-parse.pipe';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiResponseWithCaseModel(
    {
      CreateMenuDto: {
        '개별 추가': { id: 1 },
        '다중 추가': [{ id: 1 }],
      },
    },
    HttpStatus.CREATED,
    '/restaurants/:restaurantId/menus',
    'POS',
  )
  @ApiBodyWithCaseModel({
    CreateMenuDto: {
      '개별 추가': CreateMenuDto,
      '다중 추가': [CreateMenuDto],
    },
  })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiOperation({ summary: '식당 메뉴 추가' })
  @UseGuards(RestaurantOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Post()
  create(
    @Param('restaurantId') restaurantId: number,
    @Body(MenuDataParsePipe)
    createMenuDto: CreateMenuDto | CreateMenuDto[],
  ) {
    if (Array.isArray(createMenuDto)) {
      return this.menusService.createBulk(+restaurantId, createMenuDto);
    }
    return this.menusService.create(+restaurantId, createMenuDto);
  }

  @ApiOperation({ summary: '식당 메뉴 전체 조회' })
  @Roles()
  @Get()
  findAll(
    @Param('restaurantId') restaurantId: number,
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('perPage') perPage: number = PER_PAGE,
  ) {
    return this.menusService.findAll(+restaurantId, page, perPage);
  }

  @ApiOperation({ summary: '식당 메뉴 상세 조회' })
  @Roles()
  @Get(':menuId')
  findOne(@Param('menuId') menuId: string) {
    return this.menusService.findOne(+menuId);
  }

  @ApiBodyWithModel({ UpdateMenuDto })
  @ApiOperation({ summary: '식당 메뉴 수정' })
  @UseGuards(RestaurantOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Patch(':menuId')
  update(
    @Param('menuId') menuId: string,
    @Body(MenuDataParsePipe) updateMenuDto: UpdateMenuDto,
  ) {
    return this.menusService.update(+menuId, updateMenuDto);
  }

  @ApiOperation({ summary: '식당 메뉴 제거' })
  @UseGuards(RestaurantOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Delete(':menuId')
  remove(@Param('menuId') menuId: string) {
    return this.menusService.remove(+menuId);
  }
}
