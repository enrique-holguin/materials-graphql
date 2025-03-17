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

  // @ManyToOne(
  //   () => ManufacturerEntity,
  //   (manufacturer) => manufacturer.products,
  //   {
  //     cascade: true,
  //     eager: true,
  //   },
  // )
  // @JoinColumn({ name: 'manufacturerId' })
  // @Field(() => ManufacturerEntity, { nullable: true })
  // manufacturer: ManufacturerEntity;

  @ManyToOne(() => ManufacturerEntity, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'manufacturerId' })
  manufacturer: ManufacturerEntity;

  @RelationId((product: ProductEntity) => product.manufacturer)
  @Field(() => Number)
  manufacturerId: number;

  @ManyToOne(() => CategoryEntity, { cascade: true, eager: true })
  @JoinColumn({ name: 'categoryId' })
  @Field(() => CategoryEntity, { nullable: true })
  category: CategoryEntity;

  @RelationId((product: ProductEntity) => product.category)
  @Field(() => Number)
  categoryId: number;
}
