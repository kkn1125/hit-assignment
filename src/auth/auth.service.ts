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
    const hashedPassword = this.utilService.createHashedPassword(
      loginDto.password,
    );
    const user = await this.usersService.findOneByUserId(loginDto.userId);

    if (!user) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol, {
        cause: '사용자 정보를 찾을 수 없습니다.',
      });
    }

    const message = user.email + hashedPassword;
    const isCorrectPassword = this.utilService.compareInputPasswordWith(
      message,
      user.password,
    );

    if (!isCorrectPassword) {
      const errorProtocol = Protocol.BadRequest;
      throw new BadRequestException(errorProtocol, {
        cause: '입력 정보를 다시 확인해주세요.',
      });
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
