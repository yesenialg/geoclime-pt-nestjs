import { InjectRepository } from "@nestjs/typeorm";
import { Zone } from "src/domain/models/zone.entity";
import { IZoneRepository } from "src/domain/interfaces/zone.repository.interface";
import { ZoneEntity } from "../entities/zone.entity";
import { Repository } from "typeorm";

export class ZoneRepository implements IZoneRepository {
    constructor(
        @InjectRepository(ZoneEntity)
        private readonly _zoneRepo: Repository<ZoneEntity>,
    ) { }

    async create(data: { name: string }): Promise<Zone> {
        const newZone = this._zoneRepo.create(data);
        await this._zoneRepo.save(newZone);
        return new Zone(newZone.id, newZone.name);
    }

    async findAll(): Promise<Zone[]> {
        const zones = await this._zoneRepo.find();
        return zones.map((zone) => new Zone(zone.id, zone.name));
    }

    async findOneById(id: string): Promise<Zone | null> {
        const record = await this._zoneRepo.findOne({
            where: { id }
        });
        if (!record) return null;

        const zone = new Zone(record.id, record.name);
        return zone;
    }
}