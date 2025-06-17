import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateRequestDetailDto } from "src/request_detail/dto/create-request_detail.dto";
import { CreateRequestDetailAttachmentDto } from "src/request_detail_attachment/dto/create-request_detail_attachment.dto";
import { CreateRequestEmailDto } from "src/request_email/dto/create-request_email.dto";
import { CreateRequestLogDto } from "src/request_log/dto/create-request_log.dto";
import { SaveRequestSampleDto } from "src/request_sample/dto/save-request_sample.dto";

export class SaveRequestDto {

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

    @ValidateNested({ each: true })
    request_email: CreateRequestEmailDto[];

    @ValidateNested()
    request_detail: CreateRequestDetailDto;

    @ValidateNested({ each: true })
    request_detail_attachment: CreateRequestDetailAttachmentDto[];

    @ValidateNested({ each: true })
    request_sample: SaveRequestSampleDto[];

    @ValidateNested({ each: true })
    request_log: CreateRequestLogDto[];

}
