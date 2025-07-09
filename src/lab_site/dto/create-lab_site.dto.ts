import { IsBoolean, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateLabSiteDto {

    @IsString()
    @MaxLength(5)
    id: string

    @IsNumber()
    order: number

    @IsString()
    @MaxLength(50)
    name: string

    @IsBoolean()
    status: boolean

}
