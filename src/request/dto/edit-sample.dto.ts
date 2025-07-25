import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class EditSampleDto {

    @IsNumber()
    @IsOptional()
    request_id: number;

    @IsString()
    @IsOptional()
    lab_site_id: string;

    @IsNumber()
    @IsOptional()
    request_sample_id: number;

    @IsString()
    @IsOptional()
    sample_code: string;

    @IsNumber()
    @IsOptional()
    category_edit_id: number;

    @IsString()
    @IsOptional()
    edit_role_id: string;

    @IsString()
    @IsOptional()
    activity_request_id: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    remark: string;

    @IsNumber()
    @IsOptional()
    user_id: number;

}
