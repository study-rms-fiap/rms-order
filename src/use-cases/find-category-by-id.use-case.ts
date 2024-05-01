import { IProductCategoryRepositoryPort } from 'src/ports/product-category.port';

export class FindCategoryByIdUseCase {
  static run(repository: IProductCategoryRepositoryPort, categoryId: string) {
    return repository.findById(categoryId);
  }
}
