import ProductEntity from '../product_data/product_data.entity';

export class ProductTypeDTO {
  id: string;
  product_type: string;
  product_data: ProductEntity[];
  created_at: Date;
  updated_at: Date;
}
