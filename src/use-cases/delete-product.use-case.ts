import { IProductRepositoryPort } from 'src/ports/product.repository.port';

export class DeleteProductUseCase {
  static run(repository: IProductRepositoryPort, productId: string) {
    return repository.delete(productId);
  }
}
