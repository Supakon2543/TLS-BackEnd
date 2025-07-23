import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestDetailDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsOptional()
    request_id: number;

    @IsString()
    @IsOptional()
    test_report_format_id: string;

    @IsString()
    @IsOptional()
    accredited_id: string;

    @IsString()
    @IsOptional()
    report_heading_id: string;

    @IsNumber()
    @IsOptional()
    objective_id: number;

    @IsString()
    @IsOptional()
    objective_text: string;

    @IsNumber()
    @IsOptional()
    sample_stage_id: number;

    @IsString()
    @IsOptional()
    sample_stage_text: string;

    @IsNumber()
    @IsOptional()
    lab_process_id: number;

    @IsString()
    @IsOptional()
    lab_process_text: string;

    @IsNumber()
    @IsOptional()
    sample_retaining_id: number;
    
    @IsString()
    @IsOptional()
    sample_retaining_text: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    note: string;

    @IsNumber()
    @IsOptional()
    lab_receiver_id: number;

    @IsString()
    @IsOptional()
    received_date: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    lab_note: string;

    @IsNumber()
    @IsOptional()
    created_by: number;

    @IsNumber()
    @IsOptional()
    updated_by: number;

}
