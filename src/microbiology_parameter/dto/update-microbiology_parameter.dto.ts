import { PartialType } from '@nestjs/mapped-types';
import { CreateMicrobiologyParameterDto } from './create-microbiology_parameter.dto';

export class UpdateMicrobiologyParameterDto extends PartialType(CreateMicrobiologyParameterDto) {}
