// TODO: 리팩터링 필요

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@users/entities/user.entity';
import { UsersService } from '@users/users.service';
import { Protocol } from '@util/protocol';
import { UtilService } from '@util/util.service';
import { throwNoExistsEntityWithSelectBy } from '@util/utilFunction';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly utilService: UtilService,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    /* 유저 조회 후 없으면 throw */
    await throwNoExistsEntityWithSelectBy(this.userRepository, {
      where: { userId: loginDto.userId },
    });

    /* 비밀번호 검증, 틀리면 throw */
    const user = await this.usersService.comparePassword(
      loginDto.userId,
      loginDto.password,
    );

    try {
      const { accessToken, refreshToken } = this.utilService.createToken(user);
      res.cookie('refresh', refreshToken, this.utilService.cookieOptions);
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
    res.cookie('refresh', refreshToken, this.utilService.cookieOptions);
    return { accessToken };
  }
}
