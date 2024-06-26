import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
