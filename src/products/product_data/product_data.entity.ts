import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import ProductLocationEntity from '../product_location/product_location.entity';
import ProductTypeEntity from '../product_type/product_type.entity';
import { ProductEntityDTO } from '../dto/product_data.dto';

@Entity({ name: 'products' })
export default class ProductEntity implements ProductEntityDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'product_image', nullable: true })
  product_image: string;

  @ManyToOne(
    () => ProductLocationEntity,
    (productLocation) => productLocation.product_data,
    { cascade: true, eager: true },
  )
  @JoinColumn({ name: 'product_location_id' })
  location: ProductLocationEntity;

  @ManyToOne(
    () => ProductTypeEntity,
    (productLocation) => productLocation.product_data,
  )
  @JoinColumn({ name: 'product_type_id' })
  type: ProductTypeEntity;

  @Column({ name: 'quantity', default: 0 })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
