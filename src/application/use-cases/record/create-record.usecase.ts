import { Inject, Injectable } from "@nestjs/common";
import { IRecordRepository } from "src/domain/interfaces/record.repository.interface";
import { CreateRecordUsecaseDto } from '../../dtos/create-record.usecase.dto';

@Injectable()
export class CreateRecordUseCase {
    constructor(
        @Inject('IRecordRepository') private readonly _recordRepository: IRecordRepository) { }

    async execute(record: CreateRecordUsecaseDto): Promise<any> {
        return await this._recordRepository.create(record);
    }
}