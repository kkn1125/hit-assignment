import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponseWithModel(
    {
      VersionResponse: {
        version: '0.0.1',
      },
    },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'GET',
      path: '/version',
    },
  )
  @ApiOperation({ summary: '버전 확인' })
  @Get('version')
  getServerVersion() {
    return this.appService.getServerVersion();
  }
}
