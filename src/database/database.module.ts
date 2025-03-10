import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
  ],
})
export class DatabaseModule {}
