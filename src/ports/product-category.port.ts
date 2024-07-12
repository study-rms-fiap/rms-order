import { ProductCategory } from "src/domain/product/product-category.domain";

export interface IProductCategoryRepositoryPort {
  save(category: ProductCategory): Promise<{ categoryId: string }>;
  findAll(): Promise<ProductCategory[]>;
  findById(categoryId: string): Promise<ProductCategory>;
}
