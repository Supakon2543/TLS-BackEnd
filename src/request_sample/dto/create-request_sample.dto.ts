import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestSampleDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    request_id: number;

    @IsString()
    @IsOptional()
    sample_description_id: string;

    @IsString()
    @IsOptional()
    material_id: string;

    @IsString()
    @IsOptional()
    material_code: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    sample_code: string;

    @IsString()
    @IsOptional()
    @MaxLength(100)
    sample_name: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    input_sample_name: string;

    @IsNumber()
    @IsOptional()
    line_id: number;

    @IsString()
    @IsOptional()
    sampling_date: string;

    @IsString()
    @IsOptional()
    expiry_date: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    batch_no: string;

    @IsBoolean()
    @IsOptional()
    is_display_special: boolean;

    @IsString()
    @IsOptional()
    special_test_time: string;

    @IsString()
    @IsOptional()
    due_date: string;

    @IsString()
    @IsOptional()
    status_sample_id: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    note: string;

    @IsNumber()
    @IsOptional()
    category_edit_id: number;

    @IsString()
    @IsOptional()
    @MaxLength(150)
    certificate_name: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    path: string;

    @IsNumber()
    @IsOptional()
    revision: number;

    @IsString()
    @IsOptional()
    @MaxLength(150)
    certificate_name_2: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    path_2: string;

    @IsNumber()
    @IsOptional()
    revision_2: number;

    @IsBoolean()
    @IsOptional()
    is_parameter_completed: boolean;

    @IsString()
    @IsOptional()
    edit_role_id: string;

    @IsNumber()
    @IsOptional()
    created_by: number;

    @IsNumber()
    @IsOptional()
    updated_by: number;
    
}
