import { Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  getConfig<T extends (...args: any) => any>(
    configName: 'common' | 'database' | 'swagger' | 'secret',
  ): ConfigType<T> {
    return this.configService.get<T>(configName, {
      infer: true,
    }) as ConfigType<T>;
  }
}
