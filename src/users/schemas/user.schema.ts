import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Role } from 'src/constants/role.enum';

@Schema({ collection: 'users' })
export class User {
  @Prop({ default: () => randomUUID() })
  userId: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
