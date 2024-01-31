import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';
import ProductTypeEntity from './product_type.entity';
import CreateProductTypeDTO from '../dto/createProductType.dto';

@Controller('/product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  @Get()
  async getAllProductTypes() {
    return this.productTypeService.getAllProductType();
  }

  @Post()
  async createProductType(@Body() productTypeData: CreateProductTypeDTO) {
    const product = new ProductTypeEntity();
    Object.assign(product, productTypeData);

    const newProduct = await this.productTypeService.CreateProductType(product);
    return { message: 'Product type successfully Created', data: newProduct };
  }

  @Get('/seed')
  async seedData(): Promise<string> {
    await this.productTypeService.seedProductType();
    return 'Database seeded successfully!';
  }
}
