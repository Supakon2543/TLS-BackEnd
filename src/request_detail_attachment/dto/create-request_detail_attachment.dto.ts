import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestDetailAttachmentDto {

    @IsNumber()
    id: number;

    @IsNumber()
    request_id: number;

    @IsString()
    @MaxLength(100)
    filename: string;

    @IsString()
    @MaxLength(500)
    path: string;

    @IsNumber()
    @IsOptional()
    created_by: number;

    @IsString()
    base64: string;
    
}
