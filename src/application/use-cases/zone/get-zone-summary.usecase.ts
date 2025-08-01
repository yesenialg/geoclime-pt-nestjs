import { Inject, NotFoundException } from "@nestjs/common";
import { ZoneSummaryUseCaseDto } from "src/application/dtos/zone-summary.usecase.dto";
import { IRecordRepository } from "../../../domain/interfaces/record.repository.interface";
import { IZoneRepository } from "../../../domain/interfaces/zone.repository.interface";

export class GetZoneSummaryUseCase {

    constructor(
        @Inject('IRecordRepository') private readonly _recordRepository: IRecordRepository,
        @Inject('IZoneRepository') private readonly _zoneRepository: IZoneRepository
    ) { }

    async execute(zoneId: string): Promise<ZoneSummaryUseCaseDto> {
        const zone = await this._zoneRepository.findOneById(zoneId);
        
        if (!zone) {
            throw new NotFoundException(`Zone with id ${zoneId} not found`);
        }

        const records = await this._recordRepository.findByZone(zoneId);

        const temperatures = records.map(temp => temp.temperature);
        const average = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
        const min = Math.min(...temperatures);
        const max = Math.max(...temperatures);

        return {
            zone: zoneId,
            averageTemperature: Number(average.toFixed(1)),
            minTemperature: min,
            maxTemperature: max,
            recordsCount: records.length
        }
    }
}