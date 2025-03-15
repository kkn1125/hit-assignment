import { RoleGuard } from '@middleware/role.guard';
import { CommonService } from '@common/common.service';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { CommonOption } from '@common/variables/commonConf';
import { SwaggerOption } from '@common/variables/swaggerConf';
import { LoggerService } from '@logger/logger.service';
import { GlobalExceptionFilter } from '@middleware/global-exception.filter';
import { ResponseInterceptor } from '@middleware/repsonse.interceptor';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersService } from '@users/users.service';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);
  const commonService = app.get(CommonService);
  const commonOption = commonService.getConfig<CommonOption>('common');
  const swaggerOption = commonService.getConfig<SwaggerOption>('swagger');

  const reflector = app.get(Reflector);
  const usersService = app.get(UsersService);
  app.use(cookieParser());
  app.use(compression());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: commonOption.allowOrigins,
    credentials: true,
  });
  app.useGlobalGuards(new RoleGuard(usersService, reflector));
  app.useGlobalInterceptors(new ResponseInterceptor(logger));
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  const config = new DocumentBuilder()
    .setTitle('HIT 식당 시스템')
    .setDescription('HIT 식당 API 문서')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(swaggerOption.serverUrl)
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [ApiResponseWithModel],
    });
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'docs/json',
    swaggerOptions: {
      // docExpansion: 'none',
    },
  });

  await app.listen(commonOption.port, '0.0.0.0');
  const listenUrl = await app.getUrl();
  logger.debug(`listening on http://127.0.0.1:8080`);
}

bootstrap().catch((err) => {
  console.error('서버 실행에 문제가 생겼습니다. :', err);
});
