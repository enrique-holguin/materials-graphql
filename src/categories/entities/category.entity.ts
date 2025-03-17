import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CATEGORY } from '../constants/category.constant';
import { ProductEntity } from 'src/products/entities/product.entity';

@Entity(CATEGORY.tableName)
@ObjectType()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
