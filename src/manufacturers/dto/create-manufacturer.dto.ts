import { IsArray, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

export class CreateManufacturerDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products?: CreateProductDto[];
}