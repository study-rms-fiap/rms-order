import { IProductRepositoryPort } from 'src/ports/product.repository.port';

export class FindProductByCategoryUseCase {
  static run(repository: IProductRepositoryPort, categoryId: string) {
    return repository.findByCategory(categoryId);
  }
}
