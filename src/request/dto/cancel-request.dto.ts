import { IsNumber, IsOptional, IsString } from "class-validator";

export class CancelRequestDto {

    @IsNumber()
    @IsOptional()
    request_id: number;

    @IsNumber()
    @IsOptional()
    user_id: number;

    @IsString()
    @IsOptional()
    remark: string;

}
