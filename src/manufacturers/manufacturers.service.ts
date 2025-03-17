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
    // 1. Extraer nombres únicos de manufacturers
    const uniqueNames = Array.from(new Set(createManufacturers.map(dto => dto.name)));
    const manufacturersToInsert = uniqueNames.map(name => ({ name }));

    // 2. Inserta los manufacturers en bloque ignorando duplicados
    await this.manufacturerRepository
      .createQueryBuilder()
      .insert()
      .into(ManufacturerEntity)
      .values(manufacturersToInsert)
      .orIgnore()
      .execute();

    // 3. Recuperar los manufacturers con esos nombres (ya sean nuevos o preexistentes)
    const manufacturers = await this.manufacturerRepository.find({
      where: { name: In(uniqueNames) },
    });

    // 4. Crear el mapa de nombre -> id
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
