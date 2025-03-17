import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { In, Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
    private readonly productsService: ProductsService,
  ) {}

  async createBulk(createManufacturers: CreateManufacturerDto[]): Promise<Map<string, number>> {
    const uniqueNames = Array.from(new Set(createManufacturers.map(dto => dto.name)));
    const manufacturersToInsert = uniqueNames.map(name => ({ name }));

    await this.manufacturerRepository
      .createQueryBuilder()
      .insert()
      .into(ManufacturerEntity)
      .values(manufacturersToInsert)
      .orIgnore()
      .execute();

    const manufacturers = await this.manufacturerRepository.find({
      where: { name: In(uniqueNames) },
    });

    const manufacturerMap = new Map<string, number>();
    manufacturers.forEach(manufacturer => {
      manufacturerMap.set(manufacturer.name, manufacturer.id);
    });

    return manufacturerMap;
  }


  async findAll() {
    return this.manufacturerRepository.find()
  }
}
