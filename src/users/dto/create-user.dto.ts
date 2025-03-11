import { OmitType } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';

export class CreateUserDto extends OmitType(User, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'restaurants',
  'reservations',
]) {}
