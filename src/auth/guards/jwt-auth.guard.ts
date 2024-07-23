import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from "@nestjs/passport";
import { Observable } from 'rxjs';
import { IsPublic } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext){
    const isPublic = this.reflector.get(IsPublic, context.getHandler());
    if(isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
