import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
//import { OrderStatus, PaymentStatus } from '../order.entity';
export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
  @IsNumber()
  amount: number;
  @IsNumber()
  delivery_charge: number;
  @IsNumber()
  total_amount?: number;
  //   @IsEnum(PaymentStatus)
  //   paymentStatus: string;
  //   @IsEnum(OrderStatus)
  //   orderStatus: string;
  @IsString()
  payment_status: string;
  @IsString()
  order_status: string;
}
