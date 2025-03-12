import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [CategoriesModule, ProductsModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
