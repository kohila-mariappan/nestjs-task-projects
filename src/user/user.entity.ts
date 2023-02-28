import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterRemove,
  BeforeRemove,
  ManyToMany,
} from 'typeorm';
import { CartEntity } from 'src/cart/cart.entity';

@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  password: string;
  Order: any;

  @BeforeRemove()
  beforelogRemove() {
    console.log('before Removed this User', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed this User', this.id);
  }
  @ManyToMany(() => CartEntity, (cart) => cart.user)
  carts: CartEntity[];
}
