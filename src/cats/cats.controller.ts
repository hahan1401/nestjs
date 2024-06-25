import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    const cat = await this.catsService.create(createCatDto);
    console.log('cat', cat);
    return cat;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Delete('all')
  async deleteAll() {
    return this.catsService.deleteAll();
  }
}
