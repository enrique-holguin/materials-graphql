import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManufacturerEntity]), ProductsModule],
  providers: [ManufacturersService],
  exports : [ManufacturersService]
})
export class ManufacturersModule {}
