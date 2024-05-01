import { IProduct } from 'src/domain/pedido/product.domain';

export interface IProductRepositoryPort {
  findAll(): Promise<Array<IProduct>>;
  findByCategory(categoryId: string): Promise<Array<IProduct>>;
  findById(productId: string): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  update(product: IProduct): Promise<void>;
  delete(productId: string): Promise<void>;
}
