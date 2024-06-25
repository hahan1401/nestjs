import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return Cat.toDTO(createdCat);
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: number) {
    return this.catModel.findOne({ id: id });
  }

  async deleteAll(): Promise<boolean | void> {
    try {
      await this.catModel.deleteMany();
      return true;
    } catch (err) {
      throw new HttpExceptionFilter();
    }
  }
}
