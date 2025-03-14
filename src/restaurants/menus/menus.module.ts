import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '@restaurants/entities/restaurant.entity';
import { UsersModule } from '@users/users.module';
import { Menu } from './entities/menu.entity';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Restaurant]), UsersModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
