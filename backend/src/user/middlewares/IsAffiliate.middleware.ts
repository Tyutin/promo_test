import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';
import { NextFunction } from 'express';

@Injectable()
export class IsAffiliateMiddleware implements NestMiddleware {
  use(req: CustomRequestInterface, res: Response, next: NextFunction) {
    const { user } = req;
    if (!user) {
      req.isAffiliate = false;
      next();
      return;
    }
    req.isAffiliate = user.role === 'affiliate';
    next();
  }
}
