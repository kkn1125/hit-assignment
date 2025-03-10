import { CommonService } from '@common/common.service';
import { DatabaseOption } from '@common/variables/databaseConf';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  constructor(private readonly customConfig: CommonService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.customConfig.getConfig<DatabaseOption>('database');
  }
}
