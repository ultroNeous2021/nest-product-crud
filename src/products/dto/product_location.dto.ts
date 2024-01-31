import ProductEntity from '../product_data/product_data.entity';

export class ProductLocationDTO {
  id: string;
  location: string;
  product_data: ProductEntity[];
  created_at: Date;
  updated_at: Date;
}
