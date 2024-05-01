import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProduct, Product } from 'src/domain/pedido/product.domain';
import { IProductRepositoryPort } from 'src/ports/product.repository.port';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepositoryAdapter implements IProductRepositoryPort {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async save(product: Product): Promise<IProduct> {
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<IProduct[]> {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findByCategory(categoryId: string): Promise<IProduct[]> {
    return this.productRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  async findById(productId: string): Promise<IProduct> {
    return this.productRepository.findOne({
      where: { id: productId },
      relations: ['category'],
    });
  }

  async update(product: Product): Promise<void> {
    await this.productRepository.update(product.id, product);
  }

  async delete(productId: string): Promise<void> {
    await this.productRepository.delete(productId);
  }
}
