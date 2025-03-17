import { ProductEntity } from "src/products/entities/product.entity";

export interface IManufacturer {
    id: number;
    name: string;
    products: ProductEntity[];
}