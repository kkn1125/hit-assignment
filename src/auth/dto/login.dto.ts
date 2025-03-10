import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ type: String, example: 'testuser1' })
  userId!: string;

  @ApiProperty({ type: String, example: 'qweQQ!!1' })
  password!: string;
}
