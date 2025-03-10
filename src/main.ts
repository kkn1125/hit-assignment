import { CommonService } from '@common/common.service';
import { CommonOption } from '@common/variables/commonConf';
import { SwaggerOption } from '@common/variables/swaggerConf';
import { LoggerService } from '@logger/logger.service';
import { ResponseInterceptor } from '@middleware/repsonse.interceptor';
import { RoleGuard } from '@middleware/role.guard';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from '@middleware/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggerService);
  const commonService = app.get(CommonService);
  const commonOption = commonService.getConfig<CommonOption>('common');
  const swaggerOption = commonService.getConfig<SwaggerOption>('swagger');

  const reflector = app.get(Reflector);
  app.use(cookieParser());
  app.use(compression());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: commonOption.allowOrigins,
    credentials: true,
  });
  app.useGlobalGuards(new RoleGuard(reflector));
  app.useGlobalInterceptors(new ResponseInterceptor(logger));
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('HIT 식당 시스템')
    .setDescription('HIT 식당 API 문서')
    .setVersion('1.0')
    .addCookieAuth('token', { name: 'token', type: 'apiKey' })
    .addServer(swaggerOption.serverUrl)
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [],
    });
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });

  await app.listen(commonOption.port, '127.0.0.1');
  const listenUrl = await app.getUrl();
  logger.debug(`listening on ${listenUrl}`);
}

bootstrap().catch((err) => {
  console.error('서버 실행에 문제가 생겼습니다. :', err);
});
