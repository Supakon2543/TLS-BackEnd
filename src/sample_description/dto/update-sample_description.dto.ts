import { PartialType } from '@nestjs/swagger';
import { CreateSampleDescriptionDto } from './create-sample_description.dto';

export class UpdateSampleDescriptionDto extends PartialType(CreateSampleDescriptionDto) {}
