import { Injectable } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { CommonOption } from './common/variables/commonConf';

@Injectable()
export class AppService {
  constructor(private readonly commonService: CommonService) {}

  getServerVersion(): string {
    const commonConfig = this.commonService.getConfig<CommonOption>('common');
    return commonConfig.version;
  }
}
