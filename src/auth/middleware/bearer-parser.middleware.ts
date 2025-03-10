import { CommonService } from '@common/common.service';
import { SecretOption } from '@common/variables/secretConf';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Protocol } from '@util/protocol';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class BearerParserMiddleware implements NestMiddleware {
  constructor(private readonly commonService: CommonService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers?.authorization; // 헤더에서 `Bearer token` 정보 가져오기
    const secretOption = this.commonService.getConfig<SecretOption>('secret');

    if (authorization) {
      const accessToken = authorization.replace(/^bearer\s/i, '');
      try {
        const userData = jwt.verify(
          accessToken,
          secretOption.accessToken,
        ) as UserTokenData;
        req.user = userData;
      } catch (error: any) {
        switch (error.message) {
          case 'invalid signature': {
            const errorProtocol = Protocol.UnAuthorized;
            throw new UnauthorizedException(errorProtocol, {
              cause: '잘못된 서명입니다.',
            });
          }
          case 'jwt expired': {
            const errorProtocol = Protocol.UnAuthorized;
            throw new UnauthorizedException(errorProtocol, {
              cause: '토큰이 만료되었습니다.',
            });
          }
          case 'jwt malformed': {
            const errorProtocol = Protocol.UnAuthorized;
            throw new UnauthorizedException(errorProtocol, {
              cause: '잘못된 토큰 형태입니다.',
            });
          }
          default: {
            const errorProtocol = Protocol.BadRequest;
            throw new BadRequestException(errorProtocol, {
              cause: '토큰 인증에 문제가 발생했습니다.',
            });
          }
        }
      }
    }
    next();
  }
}
