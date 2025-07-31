import { Inject, Injectable } from '@nestjs/common';
import { Zone } from 'src/domain/models/zone.entity';
import { IZoneRepository } from 'src/domain/interfaces/zone.repository.interface';

@Injectable()
export class CreateZoneUseCase {
    constructor(
        @Inject('IZoneRepository') private readonly _zoneRepository: IZoneRepository) { }

    async execute(data: { name: string }): Promise<Zone> {
        return await this._zoneRepository.create(data);
    }
}