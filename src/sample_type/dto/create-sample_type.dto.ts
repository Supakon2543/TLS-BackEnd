import { IsBoolean, IsNumber, IsString, MaxLength } from "class-validator"

export class CreateSampleTypeDto {

    @IsString()
    @MaxLength(10)
    id: string

    @IsNumber()
    order: number

    @IsString()
    @MaxLength(50)
    name: string

    @IsBoolean()
    status: boolean

}
