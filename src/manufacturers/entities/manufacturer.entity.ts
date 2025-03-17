import { ProductEntity } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MANUFACTURER } from '../constants/manufacturer.constant';
import { IManufacturer } from '../interfaces/manufacturer.interface';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity(MANUFACTURER.tableName)
@ObjectType()
export class ManufacturerEntity implements IManufacturer {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.manufacturer)
  @Field(() => ProductEntity, { nullable: true })
  products: ProductEntity[];
}
