import { Request } from 'express';
import { UserEntity } from '../user/user.entity';

export interface CustomRequestInterface extends Request {
  user?: UserEntity;
  authBySecret?: boolean;
  isAdmin?: boolean;
  isAffiliate?: boolean;
}
