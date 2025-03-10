import { LoggerService } from '@logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ErrorType } from '@util/protocol';
import { ExceptionResponseFormat } from '@util/response';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  constructor(private readonly logger: LoggerService) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { errorCode, message } = exception.getResponse() as ErrorType;
    const method = request.method;
    const path = request.originalUrl;
    const detail = exception.cause;

    this.logger.debug('exception:', exception);

    const exceptionFormat = new ExceptionResponseFormat(
      status,
      errorCode,
      method,
      message,
      path,
      detail,
    );

    response.status(status).json(exceptionFormat);
  }
}
