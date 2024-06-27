import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/constants/role.enum';

export class CreateUserDto {
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsArray()
  readonly roles: Role[];
}
