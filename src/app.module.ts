import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Product } from './domain/product/product.domain';
import { ProductCategory } from './domain/product/product-category.domain';
import { ProductController } from './gateways/product/product.controller';
import { ProductRepositoryAdapter } from './gateways/product/product.repository';
import { ProductCategoryRepositoryAdapter } from './gateways/product-category/product-category.repository';
import { ProductCategoryController } from './gateways/product-category/product-category.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: config().parsed['DB_HOST'] || process.env.DB_HOST,
      port: Number(config().parsed['DB_PORT'] || process.env.DB_PORT),
      username: config().parsed['DB_USER'] || process.env.DB_USER,
      password: config().parsed['DB_PASSWORD'] || process.env.DB_PASSWORD,
      database: config().parsed['DB_DATABASE'] || process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Product, ProductCategory]),
  ],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductRepositoryAdapter, ProductCategoryRepositoryAdapter],
})
export class AppModule {
  constructor() {
    console.log('DB HOST ', config().parsed['DB_HOST'] || process.env.DB_HOST);
    console.log(
      'DB_PORT',
      Number(config().parsed['DB_PORT'] || process.env.DB_PORT),
    );
    console.log(
      'RMS Product port',
      Number(config().parsed['PORT'] || process.env.PORT),
    );
  }
}
