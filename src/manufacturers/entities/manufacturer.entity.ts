import { ProductEntity } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MANUFACTURER } from '../constants/manufacturer.constant';
import { IManufacturer } from '../interfaces/manufacturer.interface';

@Entity(MANUFACTURER.tableName)
export class ManufacturerEntity implements IManufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ProductEntity, product => product.manufacturer)
  products: ProductEntity[];
}