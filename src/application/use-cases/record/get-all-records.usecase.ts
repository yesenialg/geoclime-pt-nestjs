import { Inject, Injectable } from "@nestjs/common";
import { IRecordRepository } from "src/domain/interfaces/record.repository.interface";
import { Record } from "src/domain/models/record.entity";

@Injectable()
export class GetAllRecordsUseCase {
    constructor(
        @Inject('IRecordRepository') private readonly _recordRepository: IRecordRepository) { }

    async execute(): Promise<Record[]> {
        return await this._recordRepository.findAll();
    }
}