import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '@users/users.service';
import { UserRole } from '@util/enums/UserRole';
import { Protocol } from '@util/protocol';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const roles =
      this.reflector.get<UserRole[]>('roles', context.getHandler()) ||
      this.reflector.get<UserRole[]>('roles', context.getClass());

    if (typeof roles === 'undefined') {
      return true;
    }

    if (!user) {
      const errorProtocol = Protocol.RequiredLogin;
      throw new UnauthorizedException(errorProtocol);
    }

    if (roles.length === 0) {
      return true;
    }

    /* 데이터베이스 사용자 데이터 존재 검증, 없으면 throw */
    await this.usersService.findOne(user.id);

    const isMatchRole = this.matchRoles(roles, user.role);
    if (!isMatchRole) {
      const errorProtocol = Protocol.NoMatchRoles;
      throw new UnauthorizedException(errorProtocol);
    }

    return true;
  }

  private matchRoles(roles: UserRole[], userRole: UserRole) {
    return roles.includes(userRole);
  }
}
