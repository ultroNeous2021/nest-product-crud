import { IsNotEmpty } from 'class-validator';

export default class CreateProductLocationDTO {
  @IsNotEmpty({ message: 'The field name cannot be empty' })
  location: string;
}
