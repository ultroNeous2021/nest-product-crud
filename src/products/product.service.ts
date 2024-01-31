import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import ProductEntity from './product_data/product_data.entity';
import ProductLocationEntity from './product_location/product_location.entity';
import ProductTypeEntity from './product_type/product_type.entity';

@Injectable()
export class ProductDataService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productDataRepo: Repository<ProductEntity>,
    @InjectRepository(ProductTypeEntity)
    private readonly productTypeRepo: Repository<ProductTypeEntity>,
    @InjectRepository(ProductLocationEntity)
    private readonly productLocationRepo: Repository<ProductLocationEntity>,
  ) {}

  async getAllProduct(): Promise<ProductEntity[]> {
    const allProduct = await this.productDataRepo.find({
      relations: {
        location: true,
        type: true,
      },
    });
    return allProduct;
  }

  async getOneProduct(id: string): Promise<ProductEntity> {
    const singleProduct = await this.productDataRepo.findOne({
      where: {
        id,
      },
      relations: {
        type: true,
        location: true,
      },
    });
    return singleProduct;
  }

  async CreateProduct(productData: ProductEntity): Promise<ProductEntity> {
    const productType = await this.productTypeRepo.findOne({
      where: {
        id: productData.type as unknown as any,
      },
    });

    if (!productType) {
      throw new Error(`ProductType with id ${productData.type} not found`);
    }

    const location = await this.productLocationRepo.findOne({
      where: {
        id: productData.location as unknown as any,
      },
    });

    if (!location) {
      throw new Error(`Location with id ${productData.type} not found`);
    }

    const newProduct = this.productDataRepo.create(productData);

    return await this.productDataRepo.save(newProduct);
  }

  async UpdateProduct(
    id: string,
    productData: ProductEntity,
  ): Promise<ProductEntity> {
    const existingProduct: ProductEntity = await this.productDataRepo.findOne({
      where: {
        id,
      },
    });
    if (!existingProduct) throw new Error('Product does not exist');

    existingProduct.name = productData.name;
    existingProduct.price = productData.price;

    if (productData.product_image) {
      existingProduct.product_image = productData.product_image;
    }

    if (productData.location) {
      const location = await this.productLocationRepo.findOne({
        where: {
          id: productData.type as unknown as string,
        },
      });

      if (!location) {
        throw new Error(`Location with id ${productData.type} not found`);
      }
      existingProduct.location = productData.location;
    }

    if (productData.type) {
      const productType = await this.productTypeRepo.findOne({
        where: {
          id: productData.type as unknown as string,
        },
      });

      if (!productType) {
        throw new Error(`ProductType with id ${productData.type} not found`);
      }
      existingProduct.type = productData.type;
    }

    return await this.productDataRepo.save(existingProduct);
  }

  async deleteProduct(id: string): Promise<string> {
    const hasProduct = this.productDataRepo.findOne({
      where: {
        id,
      },
    });
    if (!hasProduct) throw new Error('Product does not exist');
    await this.productDataRepo.delete(id);
    return 'Product deleted successfully';
  }
}
