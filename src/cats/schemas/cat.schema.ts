import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { HydratedDocument } from 'mongoose';
import { CreateCatDto } from '../dto/create-cat.dto';

export type CatDocument = HydratedDocument<Cat>;

@Schema({ collection: 'cats' })
export class Cat {
  @Prop({ default: () => randomUUID() })
  id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ select: false })
  breed: string;

  public static toDTO(cat: CreateCatDto): Cat {
    const _cat = new Cat();
    _cat.age = cat.age;
    _cat.name = cat.name;
    _cat.id = cat.id;
    return _cat;
  }
}

export const CatSchema = SchemaFactory.createForClass(Cat);
