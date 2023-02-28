import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  async createOrder(@Body() body: CreateOrderDto): Promise<any> {
    return await this.orderService.createOrder(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/list/:id')
  async myOrders(@Param('id') id: number): Promise<any> {
    return await this.orderService.myOrders(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/payment')
  async payment(@Body() body: any): Promise<any> {
    return await this.orderService.payment(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/orderStatus')
  async orderStatus(@Body() body: any): Promise<any> {
    return await this.orderService.orderStatus(body);
  }
}
