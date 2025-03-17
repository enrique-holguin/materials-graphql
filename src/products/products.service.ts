import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../categories/entities/category.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT } from './constants/product.constant';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async createBulk(createProducts: CreateProductDto[]) {
    const batchSize = 500;
    for (let i = 0; i < createProducts.length; i += batchSize) {
      const batch = createProducts.slice(i, i + batchSize);
      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(PRODUCT.tableName)
        .values(
          batch.map((product) => ({
            name: product.name,
            description: product.description,
            longDescription: product.longDescription,
            category: { id: product.categoryId },
            manufacturer: { id: product.manufacturerId },
            manufacturerPartId: product.manufacturerPartId,
            requestedUnitPrice: product.requestedUnitPrice,
          })),
        )
        .orIgnore()
        .execute();
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productsRepository.find();
  }

  async findPagination(limit?: number, offset?: number) : Promise<ProductEntity[]> {
    const query = this.productsRepository.createQueryBuilder(PRODUCT.tableName);

    if (limit) query.take(limit);
    if (offset) query.skip(offset);

    return query.getMany();
  }
}
