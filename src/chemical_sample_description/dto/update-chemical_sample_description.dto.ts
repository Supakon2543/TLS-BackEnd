import { PartialType } from '@nestjs/swagger';
import { CreateChemicalSampleDescriptionDto } from './create-chemical_sample_description.dto';

export class UpdateChemicalSampleDescriptionDto extends PartialType(CreateChemicalSampleDescriptionDto) {}
