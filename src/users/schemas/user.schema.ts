import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

@Schema({ collection: 'users' })
export class User {
  @Prop({ default: () => randomUUID() })
  userId: string;

  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
