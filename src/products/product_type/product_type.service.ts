import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import ProductTypeEntity from './product_type.entity';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepo: Repository<ProductTypeEntity>,
  ) {}

  async getAllProductType(): Promise<ProductTypeEntity[]> {
    const allProduct = await this.productTypeRepo.find();
    return allProduct;
  }

  async CreateProductType(
    productData: ProductTypeEntity,
  ): Promise<ProductTypeEntity> {
    const newProduct = this.productTypeRepo.create(productData);
    return await this.productTypeRepo.save(newProduct);
  }

  async seedProductType() {
    const productTypeData: Partial<ProductTypeEntity>[] = [
      {
        product_type: 'shoes',
      },
      {
        product_type: 'wearables',
      },
      {
        product_type: 'computer',
      },
      {
        product_type: 'bottle',
      },
    ];

    try {
      await this.productTypeRepo.save(productTypeData);
    } catch (error) {
      throw new Error(`Error seeding data: ${error.message}`);
    }
  }
}
