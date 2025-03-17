import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CATEGORY } from '../constants/category.constant';

@Entity(CATEGORY.tableName)
@ObjectType()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  name: string;
}
