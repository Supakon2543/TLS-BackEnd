import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { RequestListSaveSampleDto } from "./request-list-save-sample.dto";

export class SaveSampleDto {

    @ValidateNested({ each: true })
    @IsOptional()
    request: RequestListSaveSampleDto[];

    @IsString()
    @IsOptional()
    activity_request_id: string;

    @IsNumber()
    @IsOptional()
    user_id: number;

}
