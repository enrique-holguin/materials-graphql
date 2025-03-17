import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import * as csv from 'csv-parser';
import { Readable } from 'node:stream';
import { CategoriesService } from 'src/categories/categories.service';
import { CsvEntityDto } from './dto/csv.dto';
import { ProductsService } from 'src/products/products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { ManufacturersService } from 'src/manufacturers/manufacturers.service';
import { CreateManufacturerDto } from 'src/manufacturers/dto/create-manufacturer.dto';

@Injectable()
export class FilesService {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly manufacturersService: ManufacturersService,
  ) {}

  async parseCsv(file: Express.Multer.File) {
    const stream = Readable.from(file.buffer.toString());
    const parsedData = await this.processCsvStream(stream);
    await this.categoriesService.createBulk(
      parsedData.map((r) => ({ name: r.category })),
    );

    const categoryMap = new Map<string, number>();
    const categories = await this.categoriesService.findAll();
    categories.forEach((cat) => categoryMap.set(cat.name, cat.id));

    const manufacturerMap = await this.manufacturersService.createBulk(
      parsedData.map((r) => ({ name: r.manufacturer_name })),
    );

    const products: CreateProductDto[] = parsedData.map((r) => {
      console.log(manufacturerMap.get(r.manufacturer_name));
      return {
        id: +r.id,
        description: r.description,
        longDescription: r.long_description,
        name: r.name,
        categoryId : categoryMap.get(r.category),
        manufacturerId : manufacturerMap.get(r.manufacturer_name),
        manufacturerPartId : r.manufacturer_part_id,
        requestedUnitPrice : parseFloat(r.requested_unit_price),
        unitOfMeasure : r.unit_of_measure,
        unitQuantity : r.unit_quantity,
        requestedQuantity : r.requested_quantity
      };
    });

    await this.productsService.createBulk(products);
  }

  private async processCsvStream(stream: Readable): Promise<CsvEntityDto[]> {
    const results: CsvEntityDto[] = [];
    const processingPromises: Promise<void>[] = [];

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (data: CsvEntityDto) => {
          processingPromises.push(this.processCsvRow(data, results));
        })
        .on('end', async () => {
          try {
            await Promise.all(processingPromises);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', reject);
    });

    console.log(results[0]);
    return results;
  }

  private async processCsvRow(data: CsvEntityDto, results: CsvEntityDto[]) {
    try {
      const entity = plainToInstance(CsvEntityDto, data);
      await validateOrReject(entity, { always: true });
      results.push(entity);
    } catch (error) {
      console.error('Validation error:', error);
    }
  }
}
