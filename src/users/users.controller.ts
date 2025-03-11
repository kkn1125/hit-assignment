import { Roles } from '@auth/guard/roles.decorator';
import {
  ApiBodyWithModel,
  ApiBodyWithObject,
} from '@common/decorators/api.body.with.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  PickType,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponseWithModel(PickType(User, ['id']), {
    ok: true,
    status: HttpStatus.CREATED,
    method: 'POST',
    path: '/users',
    modelName: 'SignupResponse',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponseWithModel(
    { result: true },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'POST',
      path: '/users/validate/email',
      modelName: 'ValidateEmailResponse',
    },
  )
  @ApiOperation({ summary: '이메일 중복 검증' })
  @ApiBodyWithObject('EmailValidateDto', PickType(CreateUserDto, ['email']))
  @Post('validate/email')
  checkDuplicatedEmail(@Body() emailDto: Pick<CreateUserDto, 'email'>) {
    return this.usersService.isDuplicatedBy({ email: emailDto?.email });
  }

  @ApiResponseWithModel(
    { result: true },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'POST',
      path: '/users/validate/phone',
      modelName: 'ValidatePhoneResponse',
    },
  )
  @ApiOperation({ summary: '전화번호 중복 검증' })
  @ApiBodyWithObject(
    'PhoneNumberValidateDto',
    PickType(CreateUserDto, ['phone']),
  )
  @Post('validate/phone')
  checkDuplicatedPhoneNumber(@Body() phoneDto: Pick<CreateUserDto, 'phone'>) {
    return this.usersService.isDuplicatedBy({ phone: phoneDto?.phone });
  }

  @ApiResponseWithModel(
    { result: true },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'POST',
      path: '/users/validate/userId',
      modelName: 'ValidateUserIdResponse',
    },
  )
  @ApiOperation({ summary: '사용자 아이디 중복 검증' })
  @ApiBodyWithObject('UserIdValidateDto', PickType(CreateUserDto, ['userId']))
  @Post('validate/user-id')
  checkDuplicatedUserId(@Body() userIdDto: Pick<CreateUserDto, 'userId'>) {
    return this.usersService.isDuplicatedBy({ userId: userIdDto?.userId });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 회원 정보 조회' })
  @Roles()
  @Get('me')
  async getMe(@Req() req: Request) {
    await this.usersService.throwNoExistsUserBy({ id: req.user.id });
    return this.usersService.getMe(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 정보 수정' })
  @Roles()
  @Patch('me')
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.throwNoExistsUserBy({ id: req.user.id });
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴' })
  @Roles()
  @Delete('me')
  async remove(@Req() req: Request) {
    await this.usersService.throwNoExistsUserBy({ id: req.user.id });
    return this.usersService.remove(req.user.id);
  }
}
