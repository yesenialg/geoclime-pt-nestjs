import { CreateRecordRepositoryDto } from '../dtos/create-record.repository.dto';
import { Record } from '../models/record.entity';

export const IRecordRepository = Symbol('IRecordRepository');

export interface IRecordRepository {
  findAll(): Record[] | PromiseLike<Record[]>;
  findOneById(id: string): Promise<Record | null>;
  findByZone(zoneId: string): Promise<Record[]>;
  findByZoneOrdered(zoneId: string): Promise<Record[]>;
  create(record: CreateRecordRepositoryDto): Promise<Record>;
}