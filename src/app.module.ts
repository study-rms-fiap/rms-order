import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Product } from './domain/pedido/product.domain';
import { ProductCategory } from './domain/pedido/product-category.domain';
import { ProductController } from './gateways/product/product.controller';
import { ProductRepositoryAdapter } from './gateways/product/product.repository';
import { ProductCategoryRepositoryAdapter } from './gateways/product-category/product-category.repository';
import { ProductCategoryController } from './gateways/product-category/product-category.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config().parsed['DB_HOST'],
      port: Number(config().parsed['DB_PORT']),
      username: config().parsed['DB_USER'],
      password: config().parsed['DB_PASSWORD'],
      database: config().parsed['DB_DATABASE'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Product, ProductCategory]),
  ],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductRepositoryAdapter, ProductCategoryRepositoryAdapter],
})
export class AppModule {}
