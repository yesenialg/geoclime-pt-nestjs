import { Inject, NotFoundException } from "@nestjs/common";
import { AnomalyUsecaseDto } from "src/application/dtos/zone-anomaly.usecase.dto";
import { IRecordRepository } from "../../../domain/interfaces/record.repository.interface";
import { IZoneRepository } from "../../../domain/interfaces/zone.repository.interface";

export class GetZoneAnomaliesUseCase {

    constructor(
        @Inject('IRecordRepository') private readonly _recordRepository: IRecordRepository,
        @Inject('IZoneRepository') private readonly _zoneRepository: IZoneRepository
    ) { }

    async execute(zoneId: string): Promise<AnomalyUsecaseDto[]> {
        const zone = await this._zoneRepository.findOneById(zoneId);

        if (!zone) {
            throw new NotFoundException(`Zone with id ${zoneId} not found`);
        }

        const records = await this._recordRepository.findByZoneOrdered(zoneId);

        const anomalies: AnomalyUsecaseDto[] = [];

        let group: typeof records = [];

        for (let i = 0; i < records.length; i++) {
            if (group.length === 0) {
                group.push(records[i]);
            } else {
                const diff = Math.abs(records[i].temperature - records[i - 1].temperature);
                if (diff >= 1.5) {
                    group.push(records[i]);
                } else {
                    if (group.length >= 3) {
                        anomalies.push({
                            zone: zoneId,
                            records: group.map(r => ({
                                timestamp: r.timestamp instanceof Date ? r.timestamp.toISOString() : String(r.timestamp),
                                temperature: r.temperature
                            }))
                        });
                    }
                    group = [records[i]];
                }
            }
        }

        if (group.length >= 3) {
            anomalies.push({
                zone: zoneId,
                records: group.map(r => ({
                    timestamp: r.timestamp instanceof Date ? r.timestamp.toISOString() : String(r.timestamp),
                    temperature: r.temperature
                }))
            });
        }

        return anomalies;
    }
}