import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, Min, Max, IsDefined, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateRecordControllerDto {
    @ApiProperty({ example: '01', description: 'ID of the Zone' })
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    zoneId: string;

    @ApiProperty({ example: 25, description: 'Temperature of the Record (between -30 and 30)' })
    @Type(() => Number)
    @IsDefined()	
    @IsNotEmpty()
    @IsNumber()
    @Min(-30, { message: 'Temperature must be at least -30°C' })
    @Max(40, { message: 'Temperature must not exceed 40°C' })
    temperature: number;

    @IsDefined()	
    @IsNotEmpty()
    @ApiProperty({ example: '2025-07-01T12:00:00Z', description: 'Timestamp of the Record' })
    @IsDateString()
    @IsDateString({}, { message: 'Timestamp must be a valid ISO8601 date string' })
    timestamp: string;
}