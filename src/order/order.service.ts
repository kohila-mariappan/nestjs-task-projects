import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private repo: Repository<OrderEntity>,
  ) {}
  async createOrder(body: CreateOrderDto): Promise<any> {
    const newOrder = await this.repo.create({
      product_id: body.product_id,
      user_id: body.user_id,
      amount: body.amount,
      delivery_charge: body.delivery_charge,
      total_amount: body.amount + body.delivery_charge,
      payment_status: body.payment_status,
      order_status: body.order_status,
    });
    return await this.repo.save(newOrder);
  }
  async myOrders(id: number): Promise<any> {
    const orders = await this.repo.find({ where: { user_id: id } });
    return orders;
  }
  async payment(body: any): Promise<any> {
    const orders = await this.repo.findOne({
      where: { user_id: body.user_id },
    });
    orders.payment_status = body.payment_status;
    return await this.repo.save(orders);
  }
  async orderStatus(body: any): Promise<any> {
    const orders = await this.repo.findOne({
      where: { user_id: body.user_id },
    });
    if (orders.payment_status === 'Sucess') {
      orders.order_status = 'Placed';
    } else if (orders.payment_status === 'Pending') {
      orders.order_status = 'Pending';
    } else {
      orders.order_status = 'Cancelled';
    }
    return await this.repo.save(orders);
  }
}
