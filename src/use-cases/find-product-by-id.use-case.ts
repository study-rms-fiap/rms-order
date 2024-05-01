import { IProductRepositoryPort } from 'src/ports/product.repository.port';

export class FindProductByIdUseCase {
  static run(repository: IProductRepositoryPort, productId: string) {
    return repository.findById(productId);
  }
}
