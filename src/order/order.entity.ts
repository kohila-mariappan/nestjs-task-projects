import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// export enum PaymentStatus {
//   'Pending' = 'pending',
//   'Sucess' = 'Sucess',
//   'Cancel' = 'Cancel',
// }
// export enum OrderStatus {
//   'Pending' = 'pending',
//   'Placed' = 'Placed',
//   'Delivered' = 'Delivered',
// }
@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  product_id: number;
  @Column()
  user_id: number;
  @Column()
  amount: number;
  @Column()
  delivery_charge: number;
  @Column()
  total_amount: number;
  @Column()
  payment_status: string;
  @Column()
  order_status: string;

  //   @Column({
  //     type: 'enum',
  //     enum: PaymentStatus,
  //   })
  //   format: PaymentStatus;
  //   @Column({
  //     type: 'enum',
  //     enum: OrderStatus,
  //   })
  //   formater: OrderStatus;
}
