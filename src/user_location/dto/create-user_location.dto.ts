import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from "class-validator"

export class CreateUserLocationDto {

    @IsString()
    @MaxLength(10)
    id: string

    @IsNumber()
    order: number

    @IsString()
    @MaxLength(50)
    name: string

    @IsString()
    @IsOptional()
    lab_site_id: string

    @IsBoolean()
    status: boolean

}
