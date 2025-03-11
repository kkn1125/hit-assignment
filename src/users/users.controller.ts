import { Roles } from '@auth/guard/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, PickType } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: '이메일 중복 검증' })
  @ApiBodyWithModel('EmailValidateDto', PickType(CreateUserDto, ['email']))
  @Post('validate/email')
  checkDuplicatedEmail(@Body() emailDto: Pick<CreateUserDto, 'email'>) {
    return this.usersService.isDuplicatedEmail(emailDto?.email);
  }

  @ApiOperation({ summary: '전화번호 중복 검증' })
  @ApiBodyWithModel(
    'PhoneNumberValidateDto',
    PickType(CreateUserDto, ['phone']),
  )
  @Post('validate/phone')
  checkDuplicatedPhoneNumber(@Body() phoneDto: Pick<CreateUserDto, 'phone'>) {
    return this.usersService.isDuplicatedPhoneNumber(phoneDto?.phone);
  }

  @ApiOperation({ summary: '사용자 아이디 중복 검증' })
  @ApiBodyWithModel('UserIdValidateDto', PickType(CreateUserDto, ['userId']))
  @Post('validate/user-id')
  checkDuplicatedUserId(@Body() userIdDto: Pick<CreateUserDto, 'userId'>) {
    return this.usersService.isDuplicatedUserId(userIdDto?.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 회원 정보 조회' })
  @Roles()
  @Get('me')
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 정보 수정' })
  @Roles()
  @Patch('me')
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴' })
  @Roles()
  @Delete('me')
  remove(@Req() req: Request) {
    return this.usersService.remove(req.user.id);
  }
}
