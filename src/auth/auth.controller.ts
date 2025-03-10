import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout(res);
    return;
  }
}
