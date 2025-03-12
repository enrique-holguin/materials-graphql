import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ICreadteProductDto } from '../interfaces/create-product.dto';
import { CategoryEntity } from 'src/categories/entities/category.entity';

export class CreateProductDto implements ICreadteProductDto {
  @IsString()
  description: string;

  @IsString()
  longDescription: string;

  @IsString()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CategoryEntity)
  category : Omit<CategoryEntity,'name'>
}
