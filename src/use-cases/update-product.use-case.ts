import { Product } from 'src/domain/product/product.domain';
import { ProductRepositoryAdapter } from 'src/gateways/product/product.repository';

export class UpdateProductUseCase {
  static run(repository: ProductRepositoryAdapter, product: Product) {
    return repository.update(product);
  }
}
