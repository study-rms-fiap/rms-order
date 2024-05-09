import {
  IProduct,
  Product,
  ProductStatusEnum,
} from 'src/domain/pedido/product.domain';
import { ProductRepositoryAdapter } from './product.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FindAllProductsUseCase } from 'src/use-cases/find-all-products.use-case';
import { FindProductByIdUseCase } from 'src/use-cases/find-product-by-id.use-case';
import { FindProductByCategoryUseCase } from 'src/use-cases/find-product-by-category.use-case';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductPresenter } from './presenters/create-product.presenter';
import { ProductCategory } from 'src/domain/pedido/product-category.domain';
import { ProductCategoryRepositoryAdapter } from '../product-category/product-category.repository';
import { CreateProductUseCase } from 'src/use-cases/create-product.use-case';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductPresenter } from './presenters/update-product.presenter';
import { FindCategoryByIdUseCase } from 'src/use-cases/find-category-by-id.use-case';
import { UpdateProductUseCase } from 'src/use-cases/update-product.use-case';
import { DeleteProductUseCase } from 'src/use-cases/delete-product.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('Products')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepositoryAdapter,
    private readonly productCategoryRepository: ProductCategoryRepositoryAdapter,
  ) {}

  @Get()
  async findAllProducts(): Promise<Array<IProduct>> {
    return FindAllProductsUseCase.run(this.productRepository);
  }

  @Get(':productId')
  findProductById(@Param('productId') productId: string): Promise<IProduct> {
    return FindProductByIdUseCase.run(this.productRepository, productId);
  }

  @Get('category/:categoryId')
  filterProductsByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<IProduct[]> {
    return FindProductByCategoryUseCase.run(this.productRepository, categoryId);
  }

  @Post()
  async createProduct(
    @Body() inputDto: CreateProductDto,
  ): Promise<CreateProductPresenter> {
    const { name, price, categoryId, description } = inputDto;
    const category: ProductCategory =
      await this.productCategoryRepository.findById(categoryId);
    const product: Product = new Product(
      name,
      price,
      category,
      ProductStatusEnum.ACTIVATED,
      description,
    );
    const newProduct = await CreateProductUseCase.run(
      this.productRepository,
      product,
    );

    return { productId: newProduct.id };
  }

  @Put(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() inputDto: UpdateProductDto,
  ): Promise<UpdateProductPresenter> {
    const existingProduct: Product = await FindProductByIdUseCase.run(
      this.productRepository,
      productId,
    );

    const category = await FindCategoryByIdUseCase.run(
      this.productCategoryRepository,
      inputDto.category,
    );

    if (!category)
      throw new Error(`Não existe a categoria com ID: ${category}`);
    const product: Product = new Product(
      inputDto.name,
      inputDto.price,
      category,
      inputDto.status,
      inputDto.description,
    );

    await UpdateProductUseCase.run(this.productRepository, {
      ...existingProduct,
      ...product,
    });

    return { productWasUpdated: true };
  }

  @Delete(':productId')
  async deleteProduct(
    @Param('productId') productId: string,
  ): Promise<{ productWasDeleted: boolean }> {
    await DeleteProductUseCase.run(this.productRepository, productId);
    return { productWasDeleted: true };
  }
}
