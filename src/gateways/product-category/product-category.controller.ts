import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductCategoryRepositoryAdapter } from './product-category.repository';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { CreateProductCategoryPresenter } from './presenters/product-category.presenter';
import { IProductCategory, ProductCategory } from 'src/domain/product/product-category.domain';

@ApiTags('Categories')
@Controller('categories')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryRepository: ProductCategoryRepositoryAdapter,
  ) {}

  @Post('')
  async createProductCategory(
    @Body() inputDto: CreateProductCategoryDto,
  ): Promise<CreateProductCategoryPresenter> {
    const { name, description } = inputDto;
    const category: ProductCategory = new ProductCategory(name, description);
    return this.productCategoryRepository.save(category);
  }

  @Get()
  findAll(): Promise<Array<IProductCategory>> {
    return this.productCategoryRepository.findAll();
  }
}
