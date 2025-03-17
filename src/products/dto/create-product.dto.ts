import { IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  longDescription?: string;

  @IsString()
  @IsOptional()
  customerPartId?: string;

  @IsInt()
  @IsPositive()
  manufacturerId: number;

  @IsString()
  @IsNotEmpty()
  manufacturerPartId: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  competitorId?: number;

  @IsString()
  @IsOptional()
  competitorPartName?: string;

  @IsString()
  @IsOptional()
  competitorPartId?: string;

  @IsInt()
  @IsPositive()
  categoryId: number;

  @IsString()
  @IsOptional()
  unitOfMeasure?: string;

  @IsString()
  @IsOptional()
  unitQuantity?: string;

  @IsString()
  @IsOptional()
  requestedQuantity?: string;

  @IsNumber()
  @IsPositive()
  requestedUnitPrice: number;
}