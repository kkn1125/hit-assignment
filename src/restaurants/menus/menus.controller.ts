import { Roles } from '@auth/guard/roles.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserRole } from '@users/enums/UserRole';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiOperation({ summary: '식당 메뉴 추가' })
  @Roles([UserRole.Shopkeeper])
  @Post()
  create(
    @Param('restaurantId') restaurantId: number,
    @Body() createMenuDto: CreateMenuDto,
  ) {
    return this.menusService.create(createMenuDto);
  }

  @ApiOperation({ summary: '식당 메뉴 전체 조회' })
  @Roles()
  @Get()
  findAll(@Param('restaurantId') restaurantId: number) {
    return this.menusService.findAll();
  }

  @ApiOperation({ summary: '식당 메뉴 상세 조회' })
  @Roles()
  @Get(':menuId')
  findOne(
    @Param('restaurantId') restaurantId: number,
    @Param('menuId') menuId: string,
  ) {
    return this.menusService.findOne(+menuId);
  }

  @ApiOperation({ summary: '식당 메뉴 수정' })
  @Roles([UserRole.Shopkeeper])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @ApiOperation({ summary: '식당 메뉴 제거' })
  @Roles([UserRole.Shopkeeper])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
