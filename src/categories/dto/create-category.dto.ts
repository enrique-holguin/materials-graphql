import { IsNotEmpty, IsString } from "class-validator";
import { CategoryEntity } from "../entities/category.entity";

export class CreateCategoryDto implements Omit<CategoryEntity,'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;
}