import { IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateStudentDto {
  @IsString()
  @IsOptional()
  name;

  @IsString()
  @IsOptional()
  dob;

  @IsNumber()
  roll_no;

  @IsString()
  @IsOptional()
  gender;

  @IsString()
  @IsOptional()
  password;
}
