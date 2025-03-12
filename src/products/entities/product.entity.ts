import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { IProduct } from '../interfaces/product.interface';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { PRODUCT } from '../constants/product.constant';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity(PRODUCT.tableName)
@ObjectType()
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  longDescription: string;

  @ManyToOne(() => CategoryEntity, { cascade: true, eager:true})
  @JoinColumn({ name: 'categoryId' })
  category: CategoryEntity;

  @RelationId((product: ProductEntity) => product.category)
  @Field(() => Number)
  categoryId: number;
}
