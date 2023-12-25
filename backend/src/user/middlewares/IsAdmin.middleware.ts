import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';
import { NextFunction } from 'express';

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  use(req: CustomRequestInterface, res: Response, next: NextFunction) {
    const { user } = req;
    if (!user) {
      req.isAdmin = false;
      next();
      return;
    }
    req.isAdmin = user.role === 'admin';
    next();
  }
}
