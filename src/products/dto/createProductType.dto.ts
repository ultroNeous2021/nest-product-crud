import { IsNotEmpty } from 'class-validator';

export default class CreateProductTypeDTO {
  @IsNotEmpty({ message: 'The field name cannot be empty' })
  name: string;
}
