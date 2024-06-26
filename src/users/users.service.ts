import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModal: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModal.create(createUserDto);
    return user;
  }

  async findOne(username: string): Promise<User | undefined | null> {
    return this.userModal.findOne({ username: username });
  }
}
