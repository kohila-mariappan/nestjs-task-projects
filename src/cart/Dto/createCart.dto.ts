import { IsNumber, IsNotEmpty } from 'class-validator';
export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  //@IsUnique()
  product_id: number;
  @IsNotEmpty()
  @IsNumber()
  //@IsUnique()
  user_id: number;
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
