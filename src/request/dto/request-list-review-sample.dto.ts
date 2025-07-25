import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateRequestSampleChemicalDto } from "src/request_sample_chemical/dto/create-request_sample_chemical.dto";
import { CreateRequestSampleMicrobiologyDto } from "src/request_sample_microbiology/dto/create-request_sample_microbiology.dto";

export class RequestListReviewSampleDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    lab_site_id: string;

    @IsNumber()
    @IsOptional()
    request_sample_id: number;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    sample_code: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    note: string;

}
