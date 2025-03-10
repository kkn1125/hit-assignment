import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { UtilService } from '@util/util.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { Protocol } from '@util/protocol';

@Injectable()
export class AuthService {
  refreshToken(user: UserTokenData, res: Response<any, Record<string, any>>) {
    throw new Error('Method not implemented.');
  }
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
      const { accessToken, refreshToken } = this.utilService.createToken(user);
      res.cookie('refresh', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      return { accessToken };
    } catch (error) {
      const errorProtocol = Protocol.ServerError;
      throw new InternalServerErrorException(
        errorProtocol,
        '토큰 발급에 문제가 발생했습니다.',
      );
    }
  }

  logout(res: Response) {
    res.clearCookie('refresh');
  }
}
