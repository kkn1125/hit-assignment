import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@users/enums/UserRole';
import { Protocol } from '@util/protocol';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    const roles =
      this.reflector.get('roles', context.getHandler()) ||
      this.reflector.get('roles', context.getClass());

    if (!user) {
      const errorProtocol = Protocol.UnAuthorized;
      throw new UnauthorizedException(errorProtocol);
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    const isMatchRole = this.matchRoles(roles, user.role);
    if (!isMatchRole) {
      const errorProtocol = Protocol.UnAuthorized;
      throw new UnauthorizedException(errorProtocol);
    }

    return true;
  }

  private matchRoles(roles: UserRole[], userRole: UserRole) {
    return roles.includes(userRole);
  }
}
