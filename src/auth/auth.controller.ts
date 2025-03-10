import { RoleGuard } from '@middleware/role.guard';
import { Roles } from '@middleware/roles.decorator';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Res({ passthrough: true }) res: Response, @Body() loginDto: LoginDto) {
    return this.authService.login(loginDto, res);
  }

  @UseGuards(RoleGuard)
  @Roles()
  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refreshToken(req.user, res);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.authService.logout(res);
    return;
  }
}
