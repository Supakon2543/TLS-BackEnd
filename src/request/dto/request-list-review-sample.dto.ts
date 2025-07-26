import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class RequestListReviewSampleDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    lab_site_id: string;

    @IsString()
    @IsOptional()
    request_type_id: string;

    @IsString()
    @IsOptional()
    test_report_format_id: string;

    @IsNumber()
    @IsOptional()
    request_sample_id: number;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    sample_code: string;

    @IsBoolean()
    @IsOptional()
    is_display_special: boolean;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    note: string;

}
