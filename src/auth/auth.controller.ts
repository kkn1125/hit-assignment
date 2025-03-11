import { RoleGuard } from '@auth/guard/role.guard';
import { Roles } from '@auth/guard/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, OmitType } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponseWithModel(
    {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdF91c2VyNDQiLCJlbWFpbCI6IjNkNzNmczNjejNmbDNoei4zY3kzZmwzaHoyM0BleGFtcGxlLmNvbSIsInJvbGUiOjEsImlhdCI6MTc0MTY2MTg0NCwiZXhwIjoxNzQxNjYyMTQ0LCJpc3MiOiJIaXRSZXN0YXVyYW50In0.EXw8OGfjepSiHtWqKWczb7DQyzu8ZwJmZLr4j2a1P0A',
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/auth/login',
      modelName: 'LoginResponse',
    },
  )
  @ApiBodyWithModel(LoginDto)
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, res);
  }

  @ApiResponseWithModel(
    { result: true },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/auth/logout',
      modelName: 'LogoutResponse',
    },
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout(res);
    return { result: true };
  }

  @ApiResponseWithModel(
    {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdF91c2VyNDQiLCJlbWFpbCI6IjNkNzNmczNjejNmbDNoei4zY3kzZmwzaHoyM0BleGFtcGxlLmNvbSIsInJvbGUiOjEsImlhdCI6MTc0MTY2MTg0NCwiZXhwIjoxNzQxNjYyMTQ0LCJpc3MiOiJIaXRSZXN0YXVyYW50In0.EXw8OGfjepSiHtWqKWczb7DQyzu8ZwJmZLr4j2a1P0A',
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/auth/login',
      modelName: 'RefreshResponse',
    },
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: '토큰 리프레시' })
  @UseGuards(RoleGuard)
  @Roles()
  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
