import { PickType } from '@nestjs/swagger';
import { User } from '@users/entities/user.entity';

export class CreateUserDto extends PickType(User, [
  'userId',
  'phone',
  'email',
  'username',
  'password',
  'role',
]) {}
