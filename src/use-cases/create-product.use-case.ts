import { Product } from 'src/domain/product/product.domain';
import { IProductRepositoryPort } from 'src/ports/product.repository.port';

export class CreateProductUseCase {
  static run(repository: IProductRepositoryPort, product: Product) {
    return repository.save(product);
  }
}
