import { Roles } from '@auth/guard/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseWithCaseModel } from '@common/decorators/api.response.with.case.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { CheckOwnerGuard } from '@restaurants/guard/check-owner.guard';
import { UserRole } from '@util/enums/UserRole';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';
import { ParseArrayOrOnePipe } from './pipe/parse-array-or-one.pipe';

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
  @ApiBodyWithModel({ CreateMenuDto })
  @ApiParam({ name: 'restaurantId', type: Number, example: 1 })
  @ApiOperation({ summary: '식당 메뉴 추가' })
  @UseGuards(CheckOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Post()
  create(
    @Param('restaurantId') restaurantId: number,
    @Body(ParseArrayOrOnePipe) createMenuDto: CreateMenuDto | CreateMenuDto[],
  ) {
    if (Array.isArray(createMenuDto)) {
      return this.menusService.createBulk(+restaurantId, createMenuDto);
    }
    return this.menusService.create(+restaurantId, createMenuDto);
  }

  @ApiOperation({ summary: '식당 메뉴 전체 조회' })
  @Roles()
  @Get()
  findAll(@Param('restaurantId') restaurantId: number) {
    return this.menusService.findAll(+restaurantId);
  }

  @ApiOperation({ summary: '식당 메뉴 상세 조회' })
  @Roles()
  @Get(':menuId')
  findOne(@Param('menuId') menuId: string) {
    return this.menusService.findOne(+menuId);
  }

  @ApiBodyWithModel({ UpdateMenuDto })
  @ApiOperation({ summary: '식당 메뉴 수정' })
  @UseGuards(CheckOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Patch(':menuId')
  update(
    @Param('menuId') menuId: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    return this.menusService.update(+menuId, updateMenuDto);
  }

  @ApiOperation({ summary: '식당 메뉴 제거' })
  @UseGuards(CheckOwnerGuard)
  @Roles([UserRole.Shopkeeper])
  @Delete(':menuId')
  remove(@Param('menuId') menuId: string) {
    return this.menusService.remove(+menuId);
  }
}
