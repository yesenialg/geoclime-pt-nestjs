import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateZoneControllerDto {
    @ApiProperty({ example: '1', description: 'ID of the Zone' })
    @IsString()
    name: string;
}