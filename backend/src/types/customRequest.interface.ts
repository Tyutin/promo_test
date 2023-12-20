import { Request } from 'express';
import { UserEntity } from '../next-auth/nextAuth.entity';

export interface CustomRequestInterface extends Request {
  user?: UserEntity;
  authBySecret?: boolean;
}
