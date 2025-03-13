import { Roles } from '@auth/guard/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, PickType } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserRole } from '@util/enums/UserRole';
import { DEFAULT_PAGE, PER_PAGE } from '@common/variables/environment';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponseWithModel(
    { SignupResponse: PickType(User, ['id']) },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/users',
    },
  )
  @ApiOperation({ summary: '회원가입' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponseWithModel(
    { ValidateEmailResponse: { result: true } },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'POST',
      path: '/users/validate/email',
    },
  )
  @ApiOperation({ summary: '이메일 중복 검증' })
  @ApiBodyWithModel({ EmailValidateDto: PickType(CreateUserDto, ['email']) })
  @Post('validate/email')
  checkDuplicatedEmail(@Body() emailDto: Pick<CreateUserDto, 'email'>) {
    return this.usersService.isDuplicatedBy({ email: emailDto?.email });
  }

  @ApiResponseWithModel(
    { ValidatePhoneResponse: { result: true } },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'POST',
      path: '/users/validate/phone',
    },
  )
  @ApiOperation({ summary: '전화번호 중복 검증' })
  @ApiBodyWithModel({
    PhoneNumberValidateDto: PickType(CreateUserDto, ['phone']),
  })
  @Post('validate/phone')
  checkDuplicatedPhoneNumber(@Body() phoneDto: Pick<CreateUserDto, 'phone'>) {
    return this.usersService.isDuplicatedBy({ phone: phoneDto?.phone });
  }

  @ApiResponseWithModel(
    { ValidateUserIdResponse: { result: true } },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'POST',
      path: '/users/validate/userId',
    },
  )
  @ApiOperation({ summary: '사용자 아이디 중복 검증' })
  @ApiBodyWithModel({ UserIdValidateDto: PickType(CreateUserDto, ['userId']) })
  @Post('validate/user-id')
  checkDuplicatedUserId(@Body() userIdDto: Pick<CreateUserDto, 'userId'>) {
    return this.usersService.isDuplicatedBy({ userId: userIdDto?.userId });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 예약 목록 조회' })
  @Roles([UserRole.Customer])
  @Get('me/reservations')
  async getMeResrvations(
    @Req() req: Request,
    @Query('page') page: number = DEFAULT_PAGE,
    @Query('perPage') perPage: number = PER_PAGE,
  ) {
    return this.usersService.getMeResrvations(req.user, page, perPage);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 회원 정보 조회' })
  @Roles()
  @Get('me')
  async getMe(@Req() req: Request) {
    return this.usersService.getMe(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 정보 수정' })
  @Roles()
  @Patch('me')
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴' })
  @Roles()
  @Delete('me')
  async remove(@Req() req: Request) {
    return this.usersService.remove(req.user.id);
  }
}
