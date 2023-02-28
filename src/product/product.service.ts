import { Injectable } from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDTO } from './dto/filter-product';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
//import { UsersEmail } from '../auth/entities/email.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async getFilteredProducts(FilterProductDTO: FilterProductDTO) {
    const { category, search } = FilterProductDTO;
    let products = await this.getAll();

    if (search) {
      products = products.filter(
        (product) =>
          product.name.includes(search) || product.description.includes(search),
      );
    }

    if (category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  }

  //addproduct
  async create(product: ProductEntity, user: User): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  //getallproduct
  async getAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne({ where: { id } });
  }

  //update
  async update(
    id: number,
    product: ProductEntity,
    user: User,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(id, product);
  }

  //delete
  async delete(id: number, user: User): Promise<DeleteResult> {
    return await this.productRepository.delete(id);
  }
}
