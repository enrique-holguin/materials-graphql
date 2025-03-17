import { IsString, IsNumberString, IsOptional } from 'class-validator';
import { ICsv } from '../interfaces/csv.interface';

export class CsvEntityDto implements ICsv{
  @IsNumberString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  long_description?: string;

  @IsOptional()
  @IsString()
  customer_part_id?: string;

  @IsString()
  manufacturer_name: string;

  @IsString()
  manufacturer_part_id: string;

  @IsOptional()
  @IsString()
  competitor_name?: string;

  @IsOptional()
  @IsString()
  competitor_part_name?: string;

  @IsOptional()
  @IsString()
  competitor_part_id?: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  unit_of_measure?: string;

  @IsOptional()
  @IsString()
  unit_quantity?: string;

  @IsOptional()
  @IsString()
  requested_quantity?: string;

  @IsNumberString()
  requested_unit_price: string;
}