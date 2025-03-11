import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import { Protocol } from '@util/protocol';
import { UtilService } from '@util/util.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilService: UtilService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    await this.usersService.throwNoExistsUserBy({ userId: loginDto.userId });

    const user = await this.usersService.comparePassword(
      loginDto.userId,
      loginDto.password,
    );

    const message = loginDto.userId + loginDto.password;
    const isCorrectPassword = this.utilService.compareInputPasswordWith(
      message,
      user.password,
    );

    if (!isCorrectPassword) {
      const errorProtocol = Protocol.WrongLoginData;
      throw new BadRequestException(errorProtocol);
    }

    try {
      const { accessToken, refreshToken } = this.utilService.createToken(user);
      res.cookie('refresh', refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });
      return { accessToken };
    } catch (error) {
      const errorProtocol = Protocol.JwtCreate;
      throw new BadRequestException(errorProtocol);
    }
  }

  logout(res: Response) {
    res.clearCookie('refresh');
  }

  async refreshToken(req: Request, res: Response) {
    if (!req.cookies.refresh) {
      const errorProtocol = Protocol.NoRefreshCookie;
      throw new UnauthorizedException(errorProtocol);
    }
    const user = req.user;
    const foundUser = await this.usersService.findOne(user.id);
    if (!foundUser) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol);
    }
    const { accessToken, refreshToken } = this.utilService.createToken(user);
    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    return { accessToken };
  }
}
