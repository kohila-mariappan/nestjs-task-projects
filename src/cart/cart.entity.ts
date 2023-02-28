import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user.entity';
@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  product_id: number;
  @Column()
  user_id: number;
  @Column()
  amount: GLfloat;
  @ManyToMany(() => User, (user) => user.carts)
  @JoinColumn()
  user: User[];
}
