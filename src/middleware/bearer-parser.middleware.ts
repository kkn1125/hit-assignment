import { CommonService } from '@common/common.service';
import { SecretOption } from '@common/variables/secretConf';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Protocol } from '@util/protocol';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class BearerParserMiddleware implements NestMiddleware {
  constructor(private readonly commonService: CommonService) {}

  use(req: Request, _res, next: NextFunction) {
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
            const errorProtocol = Protocol.JwtWrongSignature;
            throw new UnauthorizedException(errorProtocol);
          }
          case 'jwt expired': {
            const errorProtocol = Protocol.JwtExpired;
            throw new UnauthorizedException(errorProtocol);
          }
          case 'jwt malformed': {
            const errorProtocol = Protocol.JwtMalFormed;
            throw new UnauthorizedException(errorProtocol);
          }
          default: {
            const errorProtocol = Protocol.JwtServerException;
            throw new BadRequestException(errorProtocol);
          }
        }
      }
    }
    next();
  }
}
