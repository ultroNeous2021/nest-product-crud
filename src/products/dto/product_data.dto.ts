import ProductLocationEntity from '../product_location/product_location.entity';
import ProductTypeEntity from '../product_type/product_type.entity';

export class ProductEntityDTO {
  id: string;
  name: string;
  price: number;
  type: ProductTypeEntity;
  location: ProductLocationEntity;
  product_image?: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
