import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  constructor(name: string, age: number, breed: string) {
    this.age = age;
    this.name = name;
    this.breed = breed;
  }

  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  readonly breed: string;
}
