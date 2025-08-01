import { Inject, Injectable } from "@nestjs/common";
import { Zone } from "src/domain/models/zone.entity";
import { IZoneRepository } from "src/domain/interfaces/zone.repository.interface";

@Injectable()
export class GetAllZonesUseCase {
    
    constructor(
        @Inject('IZoneRepository') private readonly _zoneRepository: IZoneRepository
    ) { }

    async execute(): Promise<Zone[]> {
        return await this._zoneRepository.findAll();
    }
}