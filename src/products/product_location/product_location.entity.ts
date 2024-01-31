import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductLocationDTO } from '../dto/product_location.dto';
import ProductEntity from '../product_data/product_data.entity';

@Entity({ name: 'products_location' })
export default class ProductLocationEntity implements ProductLocationDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'location', nullable: false })
  location: string;

  @OneToMany(() => ProductEntity, (product) => product.location)
  product_data: ProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
