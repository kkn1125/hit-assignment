import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseSearchModel } from '@common/decorators/api.response.search.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { NumberArrayParsePipe } from '@common/number-array-parse.pipe';
import { DEFAULT_PAGE, PER_PAGE } from '@common/variables/environment';
import { Roles } from '@middleware/roles.decorator';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  PickType,
} from '@nestjs/swagger';
import { Reservation } from '@restaurants/reservations/entities/reservation.entity';
import { UserRole } from '@util/enums/UserRole';
import { Protocol } from '@util/protocol';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

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
  @ApiBodyWithModel({
    CreateUserDto,
  })
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
  @ApiBodyWithModel({ EmailValidateDto: PickType(CreateUserDto, ['email']) })
  @ApiOperation({ summary: '이메일 중복 검증' })
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
  @ApiBodyWithModel({
    PhoneNumberValidateDto: PickType(CreateUserDto, ['phone']),
  })
  @ApiOperation({ summary: '전화번호 중복 검증' })
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
      path: '/users/validate/user-id',
    },
  )
  @ApiBodyWithModel({ UserIdValidateDto: PickType(CreateUserDto, ['userId']) })
  @ApiOperation({ summary: '사용자 아이디 중복 검증' })
  @Post('validate/user-id')
  checkDuplicatedUserId(@Body() userIdDto: Pick<CreateUserDto, 'userId'>) {
    return this.usersService.isDuplicatedBy({ userId: userIdDto?.userId });
  }

  @ApiResponseSearchModel(
    { SearchUserReservationResponse: Reservation },
    '/users/me/reservations',
    {
      page: 2,
      count: 10,
      total: 3,
    },
  )
  @ApiQuery({
    name: 'menuName',
    type: String,
    example: '파스타',
    required: false,
  })
  @ApiQuery({
    name: 'reserveStartAt',
    type: Date,
    example: '2025-03-16T16:00',
    required: false,
  })
  @ApiQuery({
    name: 'reserveEndAt',
    type: Date,
    example: '2025-03-15T17:30',
    required: false,
  })
  @ApiQuery({
    name: 'phone',
    type: String,
    example: '010-1234',
    required: false,
  })
  @ApiQuery({
    name: 'amount',
    type: [Number],
    example: [1, 3],
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    example: DEFAULT_PAGE,
    required: false,
  })
  @ApiQuery({
    name: 'perPage',
    type: Number,
    example: PER_PAGE,
    required: false,
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 예약 목록 조회' })
  @Roles([UserRole.Customer])
  @Get('me/reservations')
  async getMeResrvations(
    @Req() req: Request,
    @Query('menuName') menuName: string,
    @Query('reserveStartAt') reserveStartAt: Date,
    @Query('reserveEndAt') reserveEndAt: Date,
    @Query('phone') phone: string,
    @Query('amount', NumberArrayParsePipe) amount: number[],
    @Query(
      'page',
      new ParseIntPipe({
        exceptionFactory(error) {
          const errorProtocol = Protocol.ArgsRequired;
          throw new BadRequestException(errorProtocol, { cause: error });
        },
        optional: true,
      }),
    )
    page: number = DEFAULT_PAGE,
    @Query(
      'perPage',
      new ParseIntPipe({
        exceptionFactory(error) {
          const errorProtocol = Protocol.ArgsRequired;
          throw new BadRequestException(errorProtocol, { cause: error });
        },
        optional: true,
      }),
    )
    perPage: number = PER_PAGE,
  ) {
    const searchOption = {
      menuName,
      reserveStartAt,
      reserveEndAt,
      phone,
      amount,
    };
    return this.usersService.getMeResrvations(
      req.originalUrl,
      req.user,
      page,
      perPage,
      searchOption,
    );
  }

  @ApiResponseWithModel(
    { GetMeResponse: User },
    {
      ok: true,
      status: HttpStatus.OK,
      method: 'GET',
      path: '/users/me',
    },
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: '로그인 회원 정보 조회' })
  @Roles()
  @Get('me')
  async getMe(@Req() req: Request) {
    return this.usersService.getMe(req.user);
  }

  @ApiResponseWithModel(
    { PatchUserResponse: { id: 1 } },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'PATCH',
      path: '/users/:userId',
    },
  )
  @ApiBearerAuth()
  @ApiBodyWithModel({
    UpdateUserDto,
  })
  @ApiOperation({ summary: '회원 정보 수정' })
  @Roles()
  @Patch('me')
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @ApiResponseWithModel(
    { DeleteUserResponse: { id: 1 } },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'DELETE',
      path: '/users/:userId',
    },
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: '회원 탈퇴' })
  @Roles()
  @Delete('me')
  async remove(@Req() req: Request) {
    return this.usersService.remove(req.user.id);
  }
}
