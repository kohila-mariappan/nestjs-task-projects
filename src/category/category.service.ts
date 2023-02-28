import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { CategoryDto } from './dtos/category-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private catRepository: Repository<CategoryEntity>,
  ) {}

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    return await this.catRepository.save(category);
  }

  async update(categoryDto: CategoryDto, id: string): Promise<UpdateResult> {
    return this.catRepository.update(id, { ...categoryDto });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.catRepository.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return this.catRepository.findOne({ where: { id } });
  }

  async findOneBySlug(slug: string): Promise<CategoryEntity> {
    return this.catRepository.findOne({ where: { slug } });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.catRepository.delete(id);
  }
}
