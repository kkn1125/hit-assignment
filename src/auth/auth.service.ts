import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { UtilService } from '@util/util.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { Protocol } from '@util/protocol';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilService: UtilService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    const hashedPassword = this.utilService.createHashedPassword(
      loginDto.password,
    );
    const user = await this.usersService.findOneByUserId(loginDto.userId);
    const message = user.email + hashedPassword;
    this.utilService.compareInputPasswordWith(message, user.password);

    try {
      const tokenData = this.utilService.createToken(user);
      res.cookie('token', tokenData.token, {
        httpOnly: true,
        maxAge: 5 * 60 * 1000,
      });
      res.cookie('refresh', tokenData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      });
      return tokenData;
    } catch (error) {
      const errorProtocol = Protocol.ServerError;
      throw new InternalServerErrorException(
        errorProtocol,
        '토큰 발급에 문제가 발생했습니다.',
      );
    }
  }

  logout(res: Response) {
    res.clearCookie('token');
    res.clearCookie('refresh');
  }
}
