import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductDataService } from './product.service';
import CreateProductDTO from './dto/createProduct.dto';
import ProductEntity from './product_data/product_data.entity';
import UpdateProductDTO from './dto/updateProduct.dto';
import { storage } from '../utils/helper';

@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductDataService) {}

  @Get()
  async getAllProduct(): Promise<ProductEntity[]> {
    return this.productService.getAllProduct();
  }

  @Get('/:id')
  async getSingleProduct(
    @Param('id') id: string,
  ): Promise<string | ProductEntity> {
    const productData = await this.productService.getOneProduct(id);

    if (!productData) {
      return `Product not found with ${id}`;
    }

    return productData;
  }

  @Post()
  @UseInterceptors(FileInterceptor('product_image', { storage }))
  async createProduct(
    @Body() productData: CreateProductDTO,
    @UploadedFile() productImage: Express.Multer.File,
  ) {
    const product: ProductEntity = new ProductEntity();

    if (productImage && productImage.filename) {
      productData.product_image = productImage.filename;
    }

    Object.assign(product, productData);

    const newProduct: ProductEntity =
      await this.productService.CreateProduct(product);

    return { message: 'Product successfully Created', data: newProduct };
  }

  @Put('/:id')
  async updatedProduct(
    @Param('id') id: string,
    @Body() data: UpdateProductDTO,
  ) {
    const productData = await this.productService.getOneProduct(id);

    if (!productData) {
      return `Product not found with ${id}`;
    }

    const product = new ProductEntity();
    Object.assign(product, data);
    await this.productService.UpdateProduct(id, product);
    return { message: 'Product successfully updated', id };
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const productData = await this.productService.getOneProduct(id);

    if (!productData) {
      return `Product not found with ${id}`;
    }

    await this.productService.deleteProduct(id);
    return { message: 'Product successfully deleted', id };
  }
}
