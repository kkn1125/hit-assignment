import { Injectable } from '@nestjs/common';
import { CommonService } from './common/common.service';
import { CommonOption } from './common/variables/commonConf';

@Injectable()
export class AppService {
  constructor(private readonly commonService: CommonService) {}

  getServerVersion() {
    const commonConfig = this.commonService.getConfig<CommonOption>('common');
    return { version: commonConfig.version };
  }
}
