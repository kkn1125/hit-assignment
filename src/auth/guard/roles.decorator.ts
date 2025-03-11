import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@users/enums/UserRole';

export const Roles = (args: UserRole[] = []) => SetMetadata('roles', args);
