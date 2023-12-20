import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomRequestInterface } from 'src/types/customRequest.interface';

@Injectable()
export class AuthSecretGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequestInterface>();
    return request.authBySecret;
  }
}
