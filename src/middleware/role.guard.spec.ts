import { beforeEach, describe, expect, it } from 'vitest';
import { RoleGuard } from './role.guard';
import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';

describe('RoleGuard', () => {
  let reflector: Reflector;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({}).compile();
    reflector = moduleRef.get(Reflector);
  });

  it('should be defined', () => {
    expect(new RoleGuard(reflector)).toBeDefined();
  });
});
