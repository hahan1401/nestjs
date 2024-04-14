import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [
    {
      age: 1,
      breed: '1',
      name: '1',
    },
  ];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
