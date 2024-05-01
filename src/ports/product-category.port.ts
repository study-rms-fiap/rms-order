import { ProductCategory } from 'src/domain/pedido/product-category.domain';

export interface IProductCategoryRepositoryPort {
  save(category: ProductCategory): Promise<{ categoryId: string }>;
  findAll(): Promise<ProductCategory[]>;
  findById(categoryId: string): Promise<ProductCategory>;
}
