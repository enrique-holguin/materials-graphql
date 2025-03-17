import { Resolver,Query, Int, Args } from '@nestjs/graphql';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductEntity])
  async products(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
    @Args('offset', { type: () => Int, nullable: true }) offset?: number,
  ) {
    return this.productsService.findPagination(limit, offset);
  }
}
