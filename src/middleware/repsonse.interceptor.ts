import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ResponseFormat } from '@util/response';
import { Request, Response } from 'express';
import { map, Observable, tap } from 'rxjs';
import { LoggerService } from '@logger/logger.service';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {
    logger.setContext(this);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const pathname = req.originalUrl;
    const method = req.method;
    const status = res.statusCode;
    const start = Date.now();

    return next.handle().pipe(
      map((data) => new ResponseFormat(status, method, data, pathname)),
      tap(() =>
        this.logger.log(
          `<-- Response [${method}] ${pathname} ${Date.now() - start}ms`,
        ),
      ),
    );
  }
}
