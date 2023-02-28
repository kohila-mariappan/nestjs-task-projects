import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CartEntity } from './cart.entity';

@Injectable()
export class CartService {
  CartEntity: any;
  User: any;
  constructor(
    @InjectRepository(CartEntity) private repo: Repository<CartEntity>,
  ) {}
  async addNewCart(body: any): Promise<any> {
    const newCart = await this.repo.create({
      product_id: body.product_id,
      user_id: body.user_id,
      amount: body.amount,
    });
    console.log('newcart', newCart);
    return this.repo.save(newCart);
  }
  async updateCart(id: number, attrs: Partial<CartEntity>) {
    const cart = await this.repo.findOne({ where: { id } });
    if (!cart) {
      throw new NotFoundException('user not found');
    }
    Object.assign(cart, attrs);
    return this.repo.save(cart);
  }
  async removeCart(id: number): Promise<any> {
    const cart = await this.repo.findOne({ where: { id } });
    if (!cart) {
      throw new BadRequestException('invalid cart id');
    } else {
      await this.repo.remove(cart);
    }
    return 'successfully deleted';
  }
  async getCartItemsOfUser(user_id: number): Promise<any> {
    //const cart = await this.repo.find({ where: { user_id } });
    //return cart;
    console.log(user_id);
    const user: User = await this.User.findOne({
      //where: { id: 2 },
      relations: ['carts'],
    });
    console.log(user);
    return this.CartEntity.find();
  }
}
