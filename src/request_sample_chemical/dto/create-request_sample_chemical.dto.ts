import { IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateRequestSampleChemicalDto {

    @IsNumber()
    id: number;

    @IsNumber()
    request_sample_id: number;

    @IsNumber()
    @IsOptional()
    chemical_parameter_id: number;

    @IsString()
    @IsOptional()
    @MaxLength(15)
    lab_result: string;

    @IsNumber()
    @IsOptional()
    test_by: number;

    @IsString()
    @IsOptional()
    test_date: string;

    @IsNumber()
    @IsOptional()
    created_by: number;

}
