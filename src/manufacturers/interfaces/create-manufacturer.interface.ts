import { IManufacturer } from './manufacturer.interface';

export interface ICreateManufacturer
  extends Partial<Omit<IManufacturer, 'id'>> {}
