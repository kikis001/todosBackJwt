import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/role.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    // en caso que no se tengan roles, accede directamente
    if(!roles) {
      return true;
    }

    // accedemos la solicitud http
    const request = context.switchToHttp().getRequest()
    
    // cuando la autenticación es exitosa, el guardian adjunta el objeto usuario a la solicitud
    const user = request.user as PayloadToken;

    // some lo que hace es que busca si un elemento del arreglo cumple con condición dada, si se cumple retorna true
    // si el usuario tiene un rol que puede acceder a solicitud retorna true 
    const isAuth = roles.some((role) => role === user.role)
    
    if(!isAuth) {
      throw new UnauthorizedException("Rol no acceptado");
    }
    return isAuth;
  }
}
