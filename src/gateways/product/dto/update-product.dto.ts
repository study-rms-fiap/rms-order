import { ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from 'src/domain/product/product.domain';

export class UpdateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  category: string;
  @ApiProperty()
  status: ProductStatus;
  @ApiProperty()
  description: string;
}
