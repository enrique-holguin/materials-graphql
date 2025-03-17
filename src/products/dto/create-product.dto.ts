import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ICreadteProductDto } from '../interfaces/create-product.dto';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ManufacturerEntity } from 'src/manufacturers/entities/manufacturer.entity';

export class CreateProductDto implements ICreadteProductDto {
  // /**
  //  * The IDs in the CSV file are stored as strings in a floating-point format (e.g., "1.0").
  //  * Since our database expects an integer, we use @Transform to convert the value
  //  */
  // @Transform(({ value }) => parseInt(value, 10))
  // @IsNumber()
  // id: number;

  @IsString()
  manufacturerName: string;

  @IsString()
  manufacturerPartId: string;

  @IsString()
  description: string;

  @IsString()
  longDescription: string;

  @IsString()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CategoryEntity)
  category: Omit<CategoryEntity, 'name'>;

  @IsNumber()
  manufacturerId: number;

  @IsObject()
  @ValidateNested()
  @Type(() => ManufacturerEntity)
  manufacturer: { id: number };
}
