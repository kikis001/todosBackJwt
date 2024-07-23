import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if(user) {
      const isMach = await bcrypt.compare(password, user.password);
      if(isMach) {
        const { password, ...rta } = user.toJSON();
        return rta; 
      }
    }
    return null;
  }

  async generateJWT(user: User) {
    const payload: PayloadToken = {role: user.role, sub: user._id}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
