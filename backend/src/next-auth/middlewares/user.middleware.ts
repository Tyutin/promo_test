import { Injectable, NestMiddleware } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';
import { NextFunction } from 'express';
import { sharedHeaders } from '../../../../shared/constants/shared-headers';
import { NextAuthService } from '../next-auth.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private readonly nextAuthService: NextAuthService) {}
  async use(req: CustomRequestInterface, res: Response, next: NextFunction) {
    const sessionToken = req.headers[sharedHeaders.userSessionToken];
    if (!sessionToken || !(typeof sessionToken === 'string')) {
      req.user = null;
      next();
      return;
    }
    const user = await this.nextAuthService.getUserBySessionToken(sessionToken);
    if (!user) {
      req.user = null;
      next();
      return;
    }
    req.user = user;
    next();
  }
}
