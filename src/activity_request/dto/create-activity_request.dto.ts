import { IsBoolean, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateActivityRequestDto {

    @IsString()
    @MaxLength(15)
    id: string

    @IsNumber()
    order: number

    @IsString()
    @MaxLength(50)
    name: string

    @IsBoolean()
    status: boolean

}
