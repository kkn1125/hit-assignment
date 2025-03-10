import { LoggerService } from '@logger/logger.service';
import { beforeEach, describe, expect, it } from 'vitest';
import { ResponseInterceptor } from './repsonse.interceptor';

describe('ResponseInterceptor', () => {
  let logger: LoggerService;

  beforeEach(() => {
    logger = new LoggerService();
  });

  it('should be defined', () => {
    expect(new ResponseInterceptor(logger)).toBeDefined();
  });
});
