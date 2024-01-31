import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductTypeDTO } from '../dto/product_type.dto';
import ProductEntity from '../product_data/product_data.entity';

@Entity({ name: 'products_type' })
export default class ProductTypeEntity implements ProductTypeDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'product_type', nullable: false })
  product_type: string;

  @OneToMany(() => ProductEntity, (product) => product.type)
  product_data: ProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
