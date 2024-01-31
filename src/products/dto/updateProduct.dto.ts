import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';

import { ProductLocationDTO } from './product_location.dto';
import { ProductTypeDTO } from './product_type.dto';
import { ProductEntityDTO } from './product_data.dto';

export default class UpdateProductDTO implements Partial<ProductEntityDTO> {
  @IsOptional()
  name: string;

  @IsNumber(undefined, { message: 'The field price must be of type number' })
  @IsOptional()
  price: number;

  @ValidateNested()
  @IsArray()
  @Type(() => ProductLocationDTO)
  @IsOptional()
  location: ProductLocationDTO;

  @ValidateNested()
  @IsArray()
  @IsUUID()
  type: ProductTypeDTO;
}
