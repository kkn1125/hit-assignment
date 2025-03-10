import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@users/enums/UserRole';

export class CreateUserDto {
  @ApiProperty({ type: String, example: 'testuser1' })
  userId!: string;

  @ApiProperty({ type: String, example: 'test1@example.com' })
  email!: string;

  @ApiProperty({ type: String, example: '김윤호' })
  username!: string;

  @ApiProperty({ type: String, example: 'qweQQ!!1' })
  password!: string;

  @ApiProperty({ type: () => UserRole, enum: UserRole, example: 1 })
  role!: UserRole;

  @ApiProperty({ type: () => String, example: '010-1234-5678' })
  phone!: string;
}
