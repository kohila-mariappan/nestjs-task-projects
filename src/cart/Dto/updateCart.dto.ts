import { IsNumber, IsOptional } from 'class-validator';
export class UpdateCartDto {
  @IsNumber()
  @IsOptional()
  product_id: number;
  @IsNumber()
  @IsOptional()
  user_id: number;
  @IsNumber()
  @IsOptional()
  amount: number;
}
