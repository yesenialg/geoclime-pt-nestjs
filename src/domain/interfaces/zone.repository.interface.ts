import { Zone } from '../models/zone.entity';

export const IZoneRepository = Symbol('IZoneRepository');

export interface IZoneRepository {
  findAll(): Promise<Zone[]>;
  create(data: { name: string }): Promise<Zone>;
  findOneById(id: string): Promise<Zone | null>;
}