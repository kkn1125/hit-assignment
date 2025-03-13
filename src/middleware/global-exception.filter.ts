import { LoggerService } from '@logger/logger.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorType, Protocol } from '@util/protocol';
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
    const method = request.method;
    const path = request.originalUrl;

    /* HttpException 지정 프로토콜 처리 */
    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      const { errorCode, message } = exception.getResponse() as ErrorType;
      const detail = exception.cause;

      const exceptionFormat = new ExceptionResponseFormat(
        status,
        errorCode,
        method,
        message,
        path,
        detail,
      );

      response.status(status).json(exceptionFormat);
      return;
    }

    /* 그 외 예상치 못한 예외 일괄 Bad Request(400) 처리 */
    const errorProtocol = Protocol.BadRequest;
    const exceptionFormat = new ExceptionResponseFormat(
      HttpStatus.BAD_REQUEST,
      errorProtocol.errorCode,
      method,
      errorProtocol.message,
      path,
    );
    response.status(HttpStatus.BAD_REQUEST).json(exceptionFormat);
  }
}
