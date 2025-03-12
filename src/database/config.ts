import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configDB : TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'materials',
  autoLoadEntities: true,
  synchronize: true
}