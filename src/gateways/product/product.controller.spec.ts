import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductRepositoryAdapter } from './product.repository';
import { Product } from '../../domain/pedido/product.domain';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [Product],
      controllers: [ProductController],
      providers: [ProductRepositoryAdapter],
    }).compile();

    controller = app.get<ProductController>(ProductController);
  });

  describe('findAll', () => {
    it('should return an product', () => {
      expect(controller.findAllProducts()).toBeTruthy();
    });
  });
});
