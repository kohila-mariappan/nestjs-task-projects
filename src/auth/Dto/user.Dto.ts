import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName;
  @IsEmail()
  email;
  @IsString()
  gender;
  @IsString()
  password;
}
