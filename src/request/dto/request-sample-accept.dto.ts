import { IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { CreateRequestSampleChemicalDto } from "src/request_sample_chemical/dto/create-request_sample_chemical.dto";
import { CreateRequestSampleItemDto } from "src/request_sample_item/dto/create-request_sample_item.dto";
import { CreateRequestSampleMicrobiologyDto } from "src/request_sample_microbiology/dto/create-request_sample_microbiology.dto";

export class RequestSampleAcceptDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    due_date: string;

    @ValidateNested({ each: true })
    @IsOptional()
    request_sample_chemical: CreateRequestSampleChemicalDto[];

    @ValidateNested({ each: true })
    @IsOptional()
    request_sample_microbiology: CreateRequestSampleMicrobiologyDto[];

    @ValidateNested({ each: true })
    @IsOptional()
    request_sample_item: CreateRequestSampleItemDto[];

}
