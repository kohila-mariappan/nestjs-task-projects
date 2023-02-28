import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {
  constructor(private readonly catService: CategoryService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body(new ValidationPipe()) categoryDto: CategoryDto) {
    await this.catService.create(categoryDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<CategoryEntity[]> {
    return this.catService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('categorybySlug/:slug')
  findOneBySlug(@Param('slug') slug: string) {
    return this.catService.findOneBySlug(slug);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CategoryDto) {
    return this.catService.update(updateCatDto, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.delete(id);
  }
}
