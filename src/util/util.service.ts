import { CommonService } from '@common/common.service';
import { SecretOption } from '@common/variables/secretConf';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Protocol } from './protocol';

/* 순환참조 우회를 위해 전역 모듈로 유틸 주입 활용 */
@Injectable()
export class UtilService {
  secretConfig: ReturnType<SecretOption>;

  constructor(private readonly commonService: CommonService) {
    this.secretConfig = this.commonService.getConfig<SecretOption>('secret');
  }

  /* message = userId + password 조합 */
  createHashedPassword(message: string) {
    return crypto
      .createHmac('sha256', this.secretConfig.password)
      .update(message)
      .digest('base64');
  }

  compareInputPasswordWith(message: string, userHashedPassword: string) {
    const hashedPassword = this.createHashedPassword(message);
    return hashedPassword === userHashedPassword;
  }

  createToken({
    id,
    userId,
    email,
    role,
    phone,
  }: Omit<UserTokenData, 'iss' | 'iat' | 'exp'>) {
    const userTokenData = { id, userId, email, role, phone };
    const isExistsArgs = Object.keys(userTokenData).every((item) =>
      ['id', 'userId', 'email', 'role', 'phone'].includes(item),
    );

    if (!isExistsArgs) {
      const errorProtocol = Protocol.ArgsRequired;
      throw new BadRequestException(errorProtocol);
    }

    const accessToken = jwt.sign(
      { id, userId, email, role, phone },
      this.secretConfig.accessToken,
      {
        issuer: 'HitRestaurant',
        algorithm: 'HS256',
        expiresIn: '5m',
      },
    );
    const refreshToken = jwt.sign(
      { id, userId, email, role, phone },
      this.secretConfig.refreshToken,
      {
        issuer: 'HitRestaurant',
        algorithm: 'HS256',
        expiresIn: '1d',
        subject: 'refresh',
      },
    );

    return { accessToken, refreshToken };
  }
}
