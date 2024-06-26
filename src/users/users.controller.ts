import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUSerDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUSerDto);
  }
}
