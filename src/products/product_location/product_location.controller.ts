import { Body, Controller, Get, Post } from '@nestjs/common';

import { ProductLocationService } from './product_location.service';
import CreateProductLocationDTO from '../dto/createProductLocation.dto';
import ProductLocationEntity from './product_location.entity';

@Controller('/product-location')
export class ProductLocationController {
  constructor(
    private readonly productLocationService: ProductLocationService,
  ) {}

  @Get()
  async getAllProductTypes() {
    return this.productLocationService.getAllProductLocation();
  }

  @Post()
  async createProductType(@Body() productTypeData: CreateProductLocationDTO) {
    const product = new ProductLocationEntity();
    Object.assign(product, productTypeData);

    const newProduct =
      await this.productLocationService.CreateProductLocation(product);
    return {
      message: 'Product Location successfully Created',
      data: newProduct,
    };
  }

  @Get('/seed')
  async seedData(): Promise<string> {
    await this.productLocationService.seedProductLocation();
    return 'Database seeded successfully!';
  }
}
