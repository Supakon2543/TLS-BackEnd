import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { RequestListSampleDto } from "./request-list-sample.dto";

export class SaveSampleDto {

    @ValidateNested({ each: true })
    @IsOptional()
    request: RequestListSampleDto[];

    @IsString()
    @IsOptional()
    activity_request_id: string;

    @IsNumber()
    @IsOptional()
    user_id: number;

}
