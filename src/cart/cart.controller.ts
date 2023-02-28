import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './Dto/createCart.dto';
import { UpdateCartDto } from './Dto/updateCart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('/add')
  async addCart(@Body() body: CreateCartDto): Promise<any> {
    console.log(body);
    return await this.cartService.addNewCart(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/update/:id')
  async updateCart(
    @Body() body: UpdateCartDto,
    @Param('id') id: number,
  ): Promise<any> {
    return await this.cartService.updateCart(id, body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/remove/:id')
  async removeCart(@Param('id') id: number): Promise<any> {
    return await this.cartService.removeCart(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/allCartItems/:user_id')
  async allCartItems(@Param('user_id') user_id: number): Promise<any> {
    return await this.cartService.getCartItemsOfUser(user_id);
  }
}
