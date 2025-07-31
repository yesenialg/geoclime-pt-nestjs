import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateZoneControllerDto } from '../dtos/create-zone.controller.dto';
import { Zone } from 'src/domain/models/zone.entity';
import { CreateZoneUseCase } from 'src/application/use-cases/zone/create-zone.usecase';
import { GetAllZonesUseCase } from 'src/application/use-cases/zone/get-all-zones.usecase';
import { GetZoneSummaryUseCase } from 'src/application/use-cases/zone/get-zone-summary.usecase';
import { GetZoneAnomaliesUseCase } from 'src/application/use-cases/zone/get-zone-anomalies.usecase';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from 'src/infrastructure/auth/api-key.guard';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiSecurity('x-api-key')
@Controller('zones')
@UseGuards(AuthGuard('jwt'), ApiKeyGuard)
export class ZoneController {
  constructor(
    private readonly _createZoneUseCase: CreateZoneUseCase,
    private readonly _getAllZonesUseCase: GetAllZonesUseCase,
    private readonly _getZoneSummaryUseCase: GetZoneSummaryUseCase,
    private readonly _getZoneAnomaliesUseCase: GetZoneAnomaliesUseCase
  ) { }

  @Get('/all')
  getAllZones(): Promise<Zone[]> {
    return this._getAllZonesUseCase.execute();
  }

  @Get(':zone/summary')
  async getSummary(@Param('idZone') zone: string) {
    const summary = await this._getZoneSummaryUseCase.execute(zone);
    return summary;
  }
  
  @Get(':zone/anomalies')
  async getAnomalies(@Param('zone') zone: string) {
    const anomalies = await this._getZoneAnomaliesUseCase.execute(zone);
    return { anomalies };
  }

  @Post('/create')
  async create(@Body() zone: CreateZoneControllerDto) {
    const record = await this._createZoneUseCase.execute(zone);
    return record;
  }
}
