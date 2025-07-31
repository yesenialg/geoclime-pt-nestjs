import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateZoneControllerDto } from '../dtos/create-zone.controller.dto';
import { Zone } from 'src/domain/models/zone.entity';
import { CreateZoneUseCase } from 'src/application/use-cases/zone/create-zone.usecase';
import { GetAllZonesUseCase } from 'src/application/use-cases/zone/get-all-zones.usecase';

@Controller('zones')
export class ZoneController {
  constructor(
    private readonly _createZoneUseCase: CreateZoneUseCase,
    private readonly _getAllZonesUseCase: GetAllZonesUseCase
  ) { }


  //@UseGuards(JwtAuthGuard)
  @Get('/all')
    getAllZones(): Promise<Zone[]> {
      return this._getAllZonesUseCase.execute();
    }

  @Post()
  async create(@Body() zone: CreateZoneControllerDto) {
    const record = await this._createZoneUseCase.execute(zone);
    return record;
  }
}
