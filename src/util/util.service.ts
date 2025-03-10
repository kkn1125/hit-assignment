import { CommonService } from '@common/common.service';
import { SecretOption } from '@common/variables/secretConf';
import { Injectable } from '@nestjs/common';
import { User } from '@users/entities/user.entity';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

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
  }: Omit<UserTokenData, 'iss' | 'iat' | 'exp'>) {
    const accessToken = jwt.sign(
      { id, userId, email, role },
      this.secretConfig.accessToken,
      {
        issuer: 'HitRestaurant',
        expiresIn: '5m',
      },
    );
    const refreshToken = jwt.sign(
      { id, userId, email, role },
      this.secretConfig.refreshToken,
      {
        issuer: 'HitRestaurant',
        expiresIn: '1d',
      },
    );
    return { accessToken, refreshToken };
  }
}
