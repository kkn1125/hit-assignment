import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilService } from '@util/util.service';
import { Between, Like, Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly utilService: UtilService,
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

  findAll(
    path: string,
    restaurantId: number,
    page: number,
    perPage: number,
    searchOption: SearchOption,
  ) {
    const { name, price } = searchOption;
    return this.utilService.searchPagination(
      this.menuRepository,
      path,
      {
        where: {
          restaurantId,
          name: name ? Like('%' + name + '%') : undefined,
          price: price ? Between(price[0], price[1]) : undefined,
        },
        take: perPage,
        skip: (page - 1) * perPage,
      },
      page,
      perPage,
      searchOption,
    );
  }

  findOne(menuId: number) {
    return this.menuRepository.findOneBy({ id: menuId });
  }

  update(menuId: number, updateMenuDto: UpdateMenuDto) {
    return this.menuRepository.update(menuId, updateMenuDto);
  }

  async remove(menuId: number) {
    await this.menuRepository.delete(menuId);
    return { id: menuId };
  }
}
