import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateZoneControllerDto {
    @ApiProperty({ example: 'Zone01', description: 'Name of the Zone' })
    @IsDefined()	
    @IsNotEmpty()	
    @IsString()
    name: string;
}