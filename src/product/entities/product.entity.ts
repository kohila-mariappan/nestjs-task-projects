import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  image: string;
  @Column()
  price: number;
  @Column()
  category: string;
}
