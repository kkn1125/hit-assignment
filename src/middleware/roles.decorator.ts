import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { UserRole } from '@util/enums/UserRole';
import { RoleGuard } from './role.guard';

export const Roles = (args: UserRole[] = []) => {
  return applyDecorators(SetMetadata('roles', args), UseGuards(RoleGuard));
};
