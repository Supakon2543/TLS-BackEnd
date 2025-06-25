import { Optional } from "@nestjs/common/decorators/core/optional.decorator"
import { IsString } from "class-validator"
export class CreateDowloadS3Dto {

    @IsString()
    @Optional()
    path?: string

}
