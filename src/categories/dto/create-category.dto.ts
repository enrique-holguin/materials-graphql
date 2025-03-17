import { IsNotEmpty, IsString } from "class-validator";
import { CategoryEntity } from "../entities/category.entity";
import { ProductEntity } from "src/products/entities/product.entity";

export class CreateCategoryDto implements Omit<CategoryEntity,'id' | 'products'> {
  @IsString()
  @IsNotEmpty()
  name: string;
}