import { Roles } from '@auth/guard/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponseWithModel(
    {
      LoginResponse: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdHVzZXIxIiwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInJvbGUiOjEsInBob25lIjoiMDEwLTEyMzQtNTY3OCIsImlhdCI6MTc0MTg0NTI2OSwiZXhwIjoxNzQxODQ1NTY5LCJpc3MiOiJIaXRSZXN0YXVyYW50In0.XEkAAPJvzufiwCdU5-_oXbfyIHmSm7saF7zkVm3FNSI',
      },
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/auth/login',
    },
  )
  @ApiBodyWithModel({ LoginDto })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, res);
  }

  @ApiResponseWithModel(
    { LogoutResponse: { result: true } },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/auth/logout',
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
      RefreshResponse: {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcklkIjoidGVzdHVzZXIxIiwiZW1haWwiOiJ0ZXN0MUBleGFtcGxlLmNvbSIsInJvbGUiOjEsInBob25lIjoiMDEwLTEyMzQtNTY3OCIsImlhdCI6MTc0MTg0NTI2OSwiZXhwIjoxNzQxODQ1NTY5LCJpc3MiOiJIaXRSZXN0YXVyYW50In0.XEkAAPJvzufiwCdU5-_oXbfyIHmSm7saF7zkVm3FNSI',
      },
    },
    {
      ok: true,
      status: HttpStatus.CREATED,
      method: 'POST',
      path: '/auth/login',
    },
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: '토큰 리프레시' })
  @Roles()
  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
