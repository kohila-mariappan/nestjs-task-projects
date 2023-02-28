import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req,
    @Body() product: ProductEntity,
  ): Promise<ProductEntity> {
    return await this.productService.create(product, req.user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async GetAll(): Promise<ProductEntity[]> {
    return await this.productService.getAll();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async GetOne(@Param() id: number): Promise<ProductEntity> {
    return await this.productService.getOne(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async Update(
    @Param() id: number,
    @Body() product: ProductEntity,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productService.update(id, product, req.user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async Delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productService.delete(id, req.user);
  }
}
