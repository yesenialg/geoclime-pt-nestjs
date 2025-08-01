import { Record } from "src/domain/models/record.entity";
import { Zone } from "src/domain/models/zone.entity";
import { IRecordRepository } from "src/domain/interfaces/record.repository.interface";
import { CreateRecordRepositoryDto } from "../../../domain/dtos/create-record.repository.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RecordEntity } from "../entities/record.entity";
import { Repository } from "typeorm";

export class RecordRepository implements IRecordRepository {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly _recordRepo: Repository<RecordEntity>
  ) {
  }

  async findAll(): Promise<Record[]> {
    const records = await this._recordRepo.find();
    return records.map((record) => new Record(record.id, record.zone, record.temperature, record.timestamp));
  }

  async findOneById(id: string): Promise<Record | null> {
    const record = await this._recordRepo.findOne({
      where: { id },
      relations: ['zone'],
    });
    if (!record) return null;

    const zone = new Zone(record.zone.id, record.zone.name);
    return new Record(record.id, zone, record.temperature, record.timestamp);
  }

  async findByZone(zoneId: string): Promise<Record[]> {
    const records = await this._recordRepo.find({ where: { zone: { id: zoneId } }, relations: ['zone'] });
    return records.map(e => new Record(e.id, e.zone, e.temperature, e.timestamp));
  }

  async findByZoneOrdered(zoneId: string): Promise<Record[]> {
    const records = await this._recordRepo.find({ where: { zone: { id: zoneId } }, relations: ['zone'] });
    return records.map(e => new Record(e.id, e.zone, e.temperature, e.timestamp));
  }

  async create(recordDto: CreateRecordRepositoryDto, zone: Zone): Promise<Record> {

    const recordEntity = this._recordRepo.create({
      zone,
      temperature: recordDto.temperature,
      timestamp: recordDto.timestamp,
    });
    
    await this._recordRepo.save(recordEntity);
    return new Record(recordEntity.id, zone, recordEntity.temperature, recordEntity.timestamp);
  }
}