import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateRequestSampleChemicalDto } from "src/request_sample_chemical/dto/create-request_sample_chemical.dto";
import { CreateRequestSampleMicrobiologyDto } from "src/request_sample_microbiology/dto/create-request_sample_microbiology.dto";

export class RequestListSampleDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    lab_site_id: string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    sample_code: string;

    @ValidateNested({ each: true })
    @IsOptional()
    request_sample_chemical: CreateRequestSampleChemicalDto[];

    @ValidateNested({ each: true })
    @IsOptional()
    request_sample_microbiology: CreateRequestSampleMicrobiologyDto[];

}
