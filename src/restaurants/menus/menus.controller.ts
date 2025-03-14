import { ApiBodyWithCaseModel } from '@common/decorators/api.body.with.case.model';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseSearchModel } from '@common/decorators/api.response.search.model';
import { ApiResponseWithCaseModel } from '@common/decorators/api.response.with.case.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { DEFAULT_PAGE, PER_PAGE } from '@common/variables/environment';
import { Roles } from '@middleware/roles.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
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
import { RestaurantOwnerGuard } from '@restaurants/restaurant-owner.guard';
import { UserRole } from '@util/enums/UserRole';
import { Protocol } from '@util/protocol';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { MenuDataParsePipe } from './menu-data-parse.pipe';
import { MenusService } from './menus.service';

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
  @ApiBearerAuth()
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

  @ApiResponseSearchModel(
    { SearchMenuResponse: Menu },
    '/restaurants/:restaurantId/menus',
    {
      page: 2,
      count: 10,
      total: 3,
    },
  )
  @ApiQuery({
    name: 'page',
    type: Number,
    example: DEFAULT_PAGE,
    required: false,
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    example: PER_PAGE,
    required: false,
  })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 메뉴 전체 조회' })
  @Roles()
  @Get()
  findAll(
    @Param('restaurantId') restaurantId: number,
    @Query(
      'page',
      new ParseIntPipe({
        exceptionFactory(error) {
          const errorProtocol = Protocol.ArgsRequired;
          throw new BadRequestException(errorProtocol, { cause: error });
        },
        optional: true,
      }),
    )
    page: number = DEFAULT_PAGE,
    @Query(
      'perPage',
      new ParseIntPipe({
        exceptionFactory(error) {
          const errorProtocol = Protocol.ArgsRequired;
          throw new BadRequestException(errorProtocol, { cause: error });
        },
        optional: true,
      }),
    )
    perPage: number = PER_PAGE,
  ) {
    return this.menusService.findAll(+restaurantId, page, perPage);
  }

  @ApiResponseWithModel(
    {
      SearchMenuResponse: Menu,
    },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'GET',
      path: '/restaurants/:restaurantId/menus/:menuId',
    },
  )
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiParam({ name: 'menuId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 메뉴 상세 조회' })
  @Roles()
  @Get(':menuId')
  findOne(@Param('menuId') menuId: string) {
    return this.menusService.findOne(+menuId);
  }

  @ApiResponseWithModel(
    {
      PatchMenuResponse: { id: 1 },
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'PATCH',
      path: '/restaurants/:restaurantId/menus/:menuId',
    },
  )
  @ApiBodyWithModel({ UpdateMenuDto })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiParam({ name: 'menuId', type: Number, example: 1 })
  @ApiBearerAuth()
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

  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiParam({ name: 'menuId', type: Number, example: 1 })
  @ApiBearerAuth()
  @ApiOperation({ summary: '식당 메뉴 제거' })
  @UseGuards(RestaurantOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Delete(':menuId')
  remove(@Param('menuId') menuId: string) {
    return this.menusService.remove(+menuId);
  }
}
