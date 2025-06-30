import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestLogDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsOptional()
    request_id: number;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    sample_code: string;

    @IsString()
    status_request_id: string;

    @IsString()
    activity_request_id: string;

    @IsNumber()
    @IsOptional()
    user_id: number;

    @IsString()
    timestamp: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    remark: string;

}
