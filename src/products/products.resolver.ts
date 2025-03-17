import { Resolver,Query } from '@nestjs/graphql';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query((returns) => [ProductEntity])
  post() {
    return this.productsService.findAll()
  }
}
