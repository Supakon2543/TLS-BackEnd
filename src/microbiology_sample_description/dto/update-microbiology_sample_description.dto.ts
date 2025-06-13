import { PartialType } from '@nestjs/swagger';
import { CreateMicrobiologySampleDescriptionDto } from './create-microbiology_sample_description.dto';

export class UpdateMicrobiologySampleDescriptionDto extends PartialType(CreateMicrobiologySampleDescriptionDto) {}
