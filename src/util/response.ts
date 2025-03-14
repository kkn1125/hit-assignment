import { HttpStatus } from '@nestjs/common';
import dayjs from 'dayjs';

interface CommonResponseFormat {
  ok: boolean;
  status: HttpStatus;
  method: string;
  path: string;
  timestamp: string;
}

export class ResponseFormat implements CommonResponseFormat {
  ok!: boolean;
  status!: HttpStatus;
  method!: string;
  path: string;
  payload!: string | object;
  message?: string;
  timestamp!: string;

  constructor(
    status: HttpStatus,
    method: string,
    payload: any,
    path: string,
    message?: string,
  ) {
    this.ok = [200, 201].includes(status);
    this.status = status;
    this.method = method;
    this.path = path;
    this.payload = payload;
    this.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');

    if (message) {
      this.message = message;
    }
  }
}

export class ExceptionResponseFormat implements CommonResponseFormat {
  ok!: boolean;
  status!: HttpStatus;
  code!: number;
  method!: string;
  path!: string;
  message!: string | object;
  timestamp!: string;
  detail?: unknown;

  constructor(
    status: HttpStatus,
    code: number,
    method: string,
    message: any,
    path: string,
    detail?: unknown,
  ) {
    this.ok = [200, 201].includes(status);
    this.status = status;
    this.code = code;
    this.message = message;
    this.method = method;
    this.path = path;
    this.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss.SSS');

    if (detail) {
      this.detail = detail;
    }
  }
}
