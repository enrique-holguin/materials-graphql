import { Resolver,Query } from '@nestjs/graphql';
import { ProductEntity } from './entities/product.entity';

@Resolver()
export class ProductsResolver {
  constructor() {}

  @Query((returns) => [ProductEntity])
  post() {
    return [];
  }
}
