import { Roles } from '@middleware/roles.decorator';
import { ApiBodyWithModel } from '@common/decorators/api.body.with.model';
import { ApiResponseWithModel } from '@common/decorators/api.response.with.model';
import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EXAMPLE_JWT } from '@common/variables/environment';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponseWithModel(
    {
      LoginResponse: {
        accessToken: EXAMPLE_JWT,
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
        accessToken: EXAMPLE_JWT,
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
