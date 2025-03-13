import { UserRole } from '@util/enums/UserRole';
import { ResponseFormat } from '@util/response';

export declare global {
  type UserTokenData = {
    id: number;
    userId: string;
    email: string;
    role: UserRole;
    phone: string;
    iss: string;
    iat: number;
    exp: number;
  };

  namespace Express {
    interface Request {
      user: UserTokenData;
    }
  }

  type ResponseProperty = Omit<
    ResponseFormat,
    'payload' | 'message' | 'timestamp'
  > & {
    message?: string;
  };

  type PaginationType = {
    page: number;
    total: number;
    prev?: number;
    next?: number;
  };
}
