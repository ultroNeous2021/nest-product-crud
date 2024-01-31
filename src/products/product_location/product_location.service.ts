import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import ProductLocationEntity from './product_location.entity';

@Injectable()
export class ProductLocationService {
  constructor(
    @InjectRepository(ProductLocationEntity)
    private readonly productLocationRepo: Repository<ProductLocationEntity>,
  ) {}

  async getAllProductLocation(): Promise<ProductLocationEntity[]> {
    const allProduct = await this.productLocationRepo.find();
    return allProduct;
  }

  async getOneProductLocation(
    location_id: string,
  ): Promise<ProductLocationEntity> {
    const productLocation = await this.productLocationRepo.findOne({
      where: {
        id: location_id,
      },
      relations: {
        product_data: true,
      },
    });
    if (!productLocation) {
      throw new Error(`Product location with ID ${location_id} not found`);
    }
    return productLocation;
  }

  async CreateProductLocation(
    productData: ProductLocationEntity,
  ): Promise<ProductLocationEntity> {
    const newProduct = this.productLocationRepo.create(productData);
    return await this.productLocationRepo.save(newProduct);
  }

  async seedProductLocation() {
    const productLocationData: Partial<ProductLocationEntity>[] = [
      {
        location: 'surat',
      },
      {
        location: 'ahmedabad',
      },
      {
        location: 'vadodara',
      },
      {
        location: 'anand',
      },
    ];

    try {
      await this.productLocationRepo.save(productLocationData);
    } catch (error) {
      throw new Error(`Error seeding data: ${error.message}`);
    }
  }
}
