import { CommonService } from '@common/common.service';
import { SecretOption } from '@common/variables/secretConf';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
  constructor(private readonly commonService: CommonService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userCookie = req.cookies; // 쿠키에서 `user` 정보 가져오기
    if (userCookie) {
      if ('token' in userCookie && 'refresh' in userCookie) {
        const { token } = userCookie;
        try {
          const secretOption =
            this.commonService.getConfig<SecretOption>('secret');
          const userData = jwt.verify(
            token,
            secretOption.token,
          ) as UserTokenData;
          req.user = userData;
          console.log('✨here', userData);
        } catch (e) {
          res.clearCookie('token');
          res.clearCookie('refresh');
        }
      }
    }
    next();
  }
}
