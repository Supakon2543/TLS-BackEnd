import { IsNumber, IsOptional } from "class-validator";

export class DuplicateRequestDto {

    @IsNumber()
    @IsOptional()
    id: number;

    @IsNumber()
    @IsOptional()
    user_id: number;

}
