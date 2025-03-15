import { CommonService } from '@common/common.service';
import { SecretOption } from '@common/variables/secretConf';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Protocol } from './protocol';
import { CookieOptions } from 'express';
import {
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { ValidationError } from 'class-validator';

/* 순환참조 우회를 위해 전역 모듈로 유틸 주입 활용 */
@Injectable()
export class UtilService {
  secretConfig: ReturnType<SecretOption>;
  cookieOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000,
  };

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

  async searchPagination<Domain extends ObjectLiteral>(
    orm: Repository<Domain>,
    path: string,
    query: FindManyOptions<Domain>,
    page: number,
    perPage: number,
    searchOption?: SearchOption,
  ): Promise<{ data: Domain[]; pagination: Pagination }> {
    const options = Object.fromEntries(
      Object.entries(searchOption || {}).filter(
        ([k, v]) => typeof v !== 'undefined',
      ),
    );
    const searchParam = new URLSearchParams(options);
    const dataList = await orm.find(query);
    const totalAmount = await orm.countBy(query.where ?? {});
    const total = Math.ceil(totalAmount / perPage);
    const prev = (page - 1) * perPage > 0;
    const next = (page + 1) * perPage <= totalAmount;
    const isNotEmptyParam = searchParam && searchParam.size > 0;
    const prevQuery = prev
      ? `${path}${page > 1 ? `?page=${page - 1}` : ''}${isNotEmptyParam ? '&' + searchParam.toString() : ''}`
      : undefined;
    const nextQuery = next
      ? `${path}?page=${page + 1}${isNotEmptyParam ? '&' + searchParam.toString() : ''}`
      : undefined;

    return {
      data: dataList,
      pagination: {
        page,
        count: dataList.length,
        total,
        prev: prevQuery,
        next: nextQuery,
      },
    };
  }

  async throwNoExistsEntityWithSelectBy<Domain extends ObjectLiteral>(
    orm: Repository<Domain>,
    findOption: FindOneOptions<Domain>,
  ) {
    const domainName = orm.create().constructor.name;
    const entity = await orm.findOne({
      where: findOption.where,
      select: findOption.select,
      order: findOption.order,
      relations: findOption.relations,
    });

    if (!entity) {
      const errorProtocol = Protocol.NotFound;
      throw new NotFoundException(errorProtocol, {
        cause: [domainName, findOption.where],
      });
    }

    return entity;
  }

  isEmptyObject<Obj extends object>(obj: Obj) {
    return Object.keys(obj).length === 0;
  }

  getFlatErrorConstraints(errors: ValidationError[]) {
    return errors.map((err) => Object.values(err.constraints || {})).flat();
  }
}
