import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestSampleItemDto {

    @IsNumber()
    id: number;

    @IsNumber()
    request_sample_id: number;

    @IsNumber()
    seq: number;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsNumber()
    @IsOptional()
    unit_id: number;

    @IsString()
    @IsOptional()
    time: string;

    @IsString()
    @IsOptional()
    sample_condition_id: string;

    @IsString()
    @IsOptional()
    lab_test_id: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    remark: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    remark_lab: string;

    @IsNumber()
    @IsOptional()
    created_by: number;

    @IsNumber()
    @IsOptional()
    updated_by: number;

}
