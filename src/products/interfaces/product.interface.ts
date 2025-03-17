import { ManufacturerEntity } from "src/manufacturers/entities/manufacturer.entity";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  longDescription: string;
  manufacturerName?: string;
  manufacturerPartId? : string
}
