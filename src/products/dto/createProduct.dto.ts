import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export default class CreateProductDTO {
  @IsNotEmpty({ message: 'The field name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'The field price cannot be empty' })
  @IsNumber(undefined, { message: 'The field price must be of type number' })
  price: number;

  @ValidateNested()
  @IsArray()
  @IsUUID()
  location: string;

  @ValidateNested()
  @IsArray()
  @IsUUID()
  type: string;

  @IsNumber()
  @IsUUID()
  quantity: string;

  @IsOptional()
  @IsString()
  product_image?: string;
}
