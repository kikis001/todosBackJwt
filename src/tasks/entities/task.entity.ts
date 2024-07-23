import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Task extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date, default: Date.now()})
  createdAt: Date;

  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId: User | Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
