import { IProductRepositoryPort } from 'src/ports/product.repository.port';

export class FindAllProductsUseCase {
  static run(repository: IProductRepositoryPort) {
    return repository.findAll();
  }
}
