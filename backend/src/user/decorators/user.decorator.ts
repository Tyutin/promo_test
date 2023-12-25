import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomRequestInterface } from '../../types/customRequest.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<CustomRequestInterface>();
  if (!request.user) {
    return null;
  }
  if (data) {
    return request.user[data];
  }
  return request.user;
});
