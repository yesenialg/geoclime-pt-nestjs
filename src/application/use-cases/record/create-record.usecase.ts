import { Inject, Injectable } from "@nestjs/common";
import { IRecordRepository } from "src/domain/interfaces/record.repository.interface";
import { CreateRecordDto } from '../../dtos/create-record.dto';

@Injectable()
export class CreateRecordUseCase {
    constructor(
        @Inject('IRecordRepository') private readonly _recordRepository: IRecordRepository) { }

    async execute(record: CreateRecordDto): Promise<any> {
        return await this._recordRepository.create(record);
    }
}