import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { RequestSampleAcceptDto } from "./request-sample-accept.dto";

export class AcceptRequestDto {

    @IsNumber()
    @IsOptional()
    request_id: number;

    @ValidateNested({ each: true })
    request_sample: RequestSampleAcceptDto[];

    @IsString()
    @IsOptional()
    activity_request_id: string;

    @IsString()
    @IsOptional()
    review_role_id: string;

    @IsNumber()
    @IsOptional()
    user_id: number;

    @IsString()
    @IsOptional()
    @MaxLength(8)
    lab_note: string;

    @IsString()
    @IsOptional()
    @MaxLength(12)
    remark: string;

}
