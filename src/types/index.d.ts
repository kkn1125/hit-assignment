import { UserRole } from '@users/enums/UserRole';

export declare global {
  type UserTokenData = {
    id: number;
    userId: string;
    email: string;
    role: UserRole;
    iss: string;
    iat: number;
    exp: number;
  };

  namespace Express {
    interface Request {
      user: UserTokenData;
    }
  }
}
