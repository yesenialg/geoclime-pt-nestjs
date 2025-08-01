import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class LoginControllerDto {
    @ApiProperty({ example: 'user', description: 'Username' })
    @IsDefined()	
    @IsNotEmpty()	
    @IsString()
    user: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
}