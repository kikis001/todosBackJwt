import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/models/role.model';

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, default: Role.user })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
