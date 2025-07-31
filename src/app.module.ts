import { Module } from '@nestjs/common';
import { ZoneController } from './presentation/controllers/zone.controller';
import { RecordController } from './presentation/controllers/record.controller';
import { ZoneRepository } from './infrastructure/persistence/repositories/zone.repository';
import { RecordRepository } from './infrastructure/persistence/repositories/record.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZoneEntity } from './infrastructure/persistence/entities/zone.entity';
import { RecordEntity } from './infrastructure/persistence/entities/record.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateZoneUseCase } from './application/use-cases/zone/create-zone.usecase';
import { GetAllZonesUseCase } from './application/use-cases/zone/get-all-zones.usecase';
import { CreateRecordUseCase } from './application/use-cases/record/create-record.usecase';
import { GetAllRecordsUseCase } from './application/use-cases/record/get-all-records.usecase';
import { GetZoneSummaryUseCase } from './application/use-cases/zone/get-zone-summary.usecase';
import { GetZoneAnomaliesUseCase } from './application/use-cases/zone/get-zone-anomalies.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [ZoneEntity, RecordEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([ZoneEntity, RecordEntity]),
  ],
  controllers: [ZoneController, RecordController],
  providers: [
    {
      provide: 'IZoneRepository',
      useClass: ZoneRepository,
    },
    {
      provide: 'IRecordRepository',
      useClass: RecordRepository,
    },
    CreateZoneUseCase,
    GetAllZonesUseCase,
    CreateRecordUseCase,
    GetAllRecordsUseCase,
    GetZoneSummaryUseCase,
    GetZoneAnomaliesUseCase
  ],
})
export class AppModule {}
