import { CustomRequestInterface } from 'src/types/customRequest.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AffiliateGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequestInterface>();
    return request.isAffiliate || request.isAdmin;
  }
}
