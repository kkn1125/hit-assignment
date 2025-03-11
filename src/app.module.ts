import { BearerParserMiddleware } from '@auth/middleware/bearer-parser.middleware';
import secretConf from '@common/variables/secretConf';
import swaggerConf from '@common/variables/swaggerConf';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import commonConf from './common/variables/commonConf';
import databaseConf from './common/variables/databaseConf';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { UtilModule } from './util/util.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [commonConf, databaseConf, secretConf, swaggerConf],
    }),
    CommonModule,
    DatabaseModule,
    UsersModule,
    RestaurantsModule,
    AuthModule,
    DatabaseModule,
    LoggerModule,
    UtilModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, BearerParserMiddleware).forRoutes('*api');
  }
}
