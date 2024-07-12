import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/domain/product/product-category.domain';
import { IProductCategoryRepositoryPort } from 'src/ports/product-category.port';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryRepositoryAdapter
  implements IProductCategoryRepositoryPort
{
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  findAll(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find();
  }

  findById(categoryId: string): Promise<ProductCategory> {
    return this.productCategoryRepository.findOneBy({ id: categoryId });
  }

  async save(category: ProductCategory): Promise<{ categoryId: string }> {
    const { id: categoryId } =
      await this.productCategoryRepository.save(category);
    return { categoryId };
  }
}
