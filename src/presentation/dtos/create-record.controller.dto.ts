import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString } from 'class-validator';


export class CreateRecordControllerDto {
    @ApiProperty({ example: '01', description: 'ID of the Zone' })
    @IsString()
    zoneId: string;

    @ApiProperty({ example: 123, description: 'Temperature of the Record' })
    @IsNumber()
    temperature: number;

    @ApiProperty({ example: '2025-07-01T12:00:00Z', description: 'Timestamp of the Record' })
    @IsDateString()
    timestamp: string;
}