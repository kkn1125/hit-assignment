import { LoggerService } from '@logger/logger.service';
import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { LoggerMiddleware } from './logger.middleware';

describe('LoggerMiddleware', () => {
  let logger: LoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({}).compile();
    logger = moduleRef.get(LoggerService);
  });

  it('should be defined', () => {
    expect(new LoggerMiddleware(logger)).toBeDefined();
  });
});
