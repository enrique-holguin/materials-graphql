import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async createBulk(categories: CreateCategoryDto[]) {    
    const uniqueCategories = Array.from(
      new Set(categories.map((c) => c.name)),
    ).map((name) => ({ name }));

    await this.categoryRepository
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values(uniqueCategories)
      .orIgnore()
      .execute();
  }

  async findAll() {
    return this.categoryRepository.find()
  }
}
