import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IProduct } from '../interfaces/product.interface';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { PRODUCT } from '../constants/product.constant';
import { Field, ObjectType } from '@nestjs/graphql';
import { ManufacturerEntity } from 'src/manufacturers/entities/manufacturer.entity';

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

  @Column({ nullable: true })
  customerPartId?: string;

  @ManyToOne(
    () => ManufacturerEntity,
    (manufacturer) => manufacturer.products,
    { eager: true, nullable: true },
  )
  @Field(() => ManufacturerEntity, { nullable: true })
  manufacturer: ManufacturerEntity;

  @Column({ unique: true })
  @Field(() => String)
  manufacturerPartId: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
    nullable: true,
  })
  @Field(() => CategoryEntity, { nullable: true })
  category: CategoryEntity;
}
