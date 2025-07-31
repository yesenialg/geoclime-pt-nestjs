import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateZoneControllerDto {
    @ApiProperty({ example: 'Zone01', description: 'Name of the Zone' })
    @IsString()
    name: string;
}