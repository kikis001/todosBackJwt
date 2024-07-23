import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string){
    const userEmail = await this.userModel.findOne({email}).exec()
    return userEmail;
  }

  get() {
    return this.userModel.find();
  }

  async create(user: CreateUserDto): Promise<Omit<User, 'password'>>{
    const newUser = new this.userModel(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const userSave = await newUser.save();
    const { password, ...rta } = userSave.toJSON();
    return rta
  }

  update(id: string, changes: UpdateUserDto) {
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
