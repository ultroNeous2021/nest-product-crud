import { Module } from '@nestjs/common';
import { ProductDataService } from './product.service';
import { ProductController } from './product.controller';
import ProductEntity from './product_data/product_data.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeController } from './product_type/product_type.controller';
import { ProductTypeService } from './product_type/product_type.service';
import ProductLocationEntity from './product_location/product_location.entity';
import ProductTypeEntity from './product_type/product_type.entity';
import { ProductLocationService } from './product_location/product_location.service';
import { ProductLocationController } from './product_location/product_location.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductLocationEntity,
      ProductTypeEntity,
    ]),
  ],
  providers: [ProductDataService, ProductTypeService, ProductLocationService],
  controllers: [
    ProductController,
    ProductTypeController,
    ProductLocationController,
  ],
})
export class ProductsModule {}
