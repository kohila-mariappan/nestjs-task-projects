import { IsString, IsNumber } from 'class-validator';
export class CreateStudentDto {
  @IsString()
  name;

  @IsString()
  dob;

  @IsNumber()
  roll_no;

  @IsString()
  gender;

  @IsString()
  password;
}
