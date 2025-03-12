import { IProduct } from "./product.interface";

export interface ICreadteProductDto extends Omit<IProduct,'id'>{
  categoryId? : number
}