import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestEmailDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsOptional()
    request_id: number;

    @IsNumber()
    user_id: number;

    @IsString()
    @MaxLength(100)
    email: string;

    @IsNumber()
    @IsOptional()
    created_by: number;

}