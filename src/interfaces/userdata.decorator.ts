import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from './users.entity';

export const UserData = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
