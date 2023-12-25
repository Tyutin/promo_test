import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';
import { NextFunction } from 'express';

@Injectable()
export class AuthSecretMiddleware implements NestMiddleware {
  use(req: CustomRequestInterface, res: Response, next: NextFunction) {
    const authSecretCode =
      req.headers[process.env.NEST_AUTH_SECRET_HEADER || 'x-auth'];
    if (!authSecretCode) {
      req.authBySecret = false;
      next();
      return;
    }

    req.authBySecret = authSecretCode === process.env.NEST_AUTH_SECRET;
    next();
  }
}
