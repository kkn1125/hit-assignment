import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: any, next: () => void) {
    const method = req.method;
    const url = req.originalUrl;
    this.logger.log(`Request [${method}] ${url} -->`);
    next();
  }
}
