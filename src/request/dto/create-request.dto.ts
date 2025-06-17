import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestDto {

    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    @MaxLength(8)
    request_number: string;

    @IsString()
    @IsOptional()
    lab_site_id: string;

    @IsString()
    @IsOptional()
    request_type_id: string;

    @IsString()
    @IsOptional()
    request_date: string;

    @IsString()
    @IsOptional()
    due_date: string;

    @IsString()
    @IsOptional()
    @MaxLength(12)
    telephone: string;

    @IsString()
    @IsOptional()
    status_request_id: string;

    @IsString()
    @IsOptional()
    status_sample_id: string;

    @IsString()
    @IsOptional()
    review_role_id: string;

    @IsNumber()
    @IsOptional()
    original_id: number;

    @IsNumber()
    @IsOptional()
    created_by: number;

    @IsNumber()
    @IsOptional()
    updated_by: number;

}
