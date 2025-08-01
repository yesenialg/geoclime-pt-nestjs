import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IRecordRepository } from "src/domain/interfaces/record.repository.interface";
import { CreateRecordUsecaseDto } from '../../dtos/create-record.usecase.dto';
import { IZoneRepository } from "src/domain/interfaces/zone.repository.interface";

@Injectable()
export class CreateRecordUseCase {

    constructor(
        @Inject('IRecordRepository') private readonly _recordRepository: IRecordRepository,
        @Inject('IZoneRepository') private readonly _zoneRepository: IZoneRepository
    ) { }

    async execute(record: CreateRecordUsecaseDto): Promise<any> {
        const zone = await this._zoneRepository.findOneById(record.zoneId);

        if (!zone) {
            throw new NotFoundException(`Zone with id ${record.zoneId} not found`);
        }
        
        return await this._recordRepository.create(record, zone);
    }
}