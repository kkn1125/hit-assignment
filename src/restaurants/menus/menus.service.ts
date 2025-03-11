import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async createBulk(restaurantId: number, createMenuDto: CreateMenuDto[]) {
    const bulkMenus = await this.menuRepository.save(
      createMenuDto.map((menu) => ({ restaurantId, ...menu })),
    );
    return bulkMenus.map(({ id }) => ({
      id,
    }));
  }

  async create(restaurantId: number, createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepository.save({
      restaurantId,
      ...createMenuDto,
    });
    return { id: menu.id };
  }

  findAll(restaurantId: number) {
    return this.menuRepository.find({
      where: {
        restaurantId,
      },
    });
  }

  findOne(menuId: number) {
    return this.menuRepository.findOneBy({ id: menuId });
  }

  update(menuId: number, updateMenuDto: UpdateMenuDto) {
    return this.menuRepository.update(menuId, updateMenuDto);
  }

  remove(menuId: number) {
    return this.menuRepository.delete(menuId);
  }
}
