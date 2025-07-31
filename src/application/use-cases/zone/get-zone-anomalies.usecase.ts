import { Inject } from "@nestjs/common";
import { AnomalyUsecaseDto } from "src/application/dtos/zone-anomaly.usecase.dto";
import { IRecordRepository } from "src/domain/interfaces/record.repository.interface";

export class GetZoneAnomaliesUseCase {
    constructor(
        @Inject('IRecordRepository') private readonly _recordRepository: IRecordRepository
    ) { }

    async execute(zoneId: string): Promise<AnomalyUsecaseDto[]> {
        const records = await this._recordRepository.findByZoneOrdered(zoneId);
        const anomalies: AnomalyUsecaseDto[] = [];

        for (let i = 0; i <= records.length - 3; i++) {
            const sequence = records.slice(i, i + 3);
            const isAnomaly = sequence.every((record, index) => {
                if (index === 0) return true;
                const diff = Math.abs(record.temperature - sequence[index - 1].temperature);
                return diff >= 1.5;
            });
            if (isAnomaly) {
                anomalies.push({
                    zone: zoneId,
                    records: sequence.map(r => ({
                        timestamp: r.timestamp instanceof Date ? r.timestamp.toISOString() : String(r.timestamp),
                        temperature: r.temperature
                    }))
                });
            }
        }

        return anomalies;
    }
}