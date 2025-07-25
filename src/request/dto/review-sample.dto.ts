import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { RequestListReviewSampleDto } from "./request-list-review-sample.dto";

export class ReviewSampleDto {

    @ValidateNested({ each: true })
    @IsOptional()
    request: RequestListReviewSampleDto[];

    @IsString()
    @IsOptional()
    activity_request_id: string;

    @IsNumber()
    @IsOptional()
    user_id: number;

}
