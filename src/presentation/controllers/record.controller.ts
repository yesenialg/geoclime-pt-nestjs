import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { CreateRecordControllerDto } from '../dtos/create-record.controller.dto';
import { Record } from 'src/domain/models/record.entity';
import { CreateRecordUseCase } from 'src/application/use-cases/record/create-record.usecase';
import { GetAllRecordsUseCase } from 'src/application/use-cases/record/get-all-records.usecase';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from 'src/infrastructure/auth/api-key.guard';

@ApiBearerAuth()
@ApiSecurity('x-api-key')
@Controller('records')
@UseGuards(AuthGuard('jwt'), ApiKeyGuard)
export class RecordController {
  constructor(
    private readonly _createRecordUseCase: CreateRecordUseCase,
    private readonly _getAllRecordsUseCase: GetAllRecordsUseCase
  ) { }

  @Get('/all')
  getAllRecords(): Promise<Record[]> {
    return this._getAllRecordsUseCase.execute();
  }

  @Post('/create')
  async create(@Body() createRecordDto: CreateRecordControllerDto) {
    const record = await this._createRecordUseCase.execute({
      zoneId: createRecordDto.zoneId,
      temperature: createRecordDto.temperature,
      timestamp: new Date(createRecordDto.timestamp),
    });
    return record;
  }
}
