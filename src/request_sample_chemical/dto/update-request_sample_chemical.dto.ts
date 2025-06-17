import { PartialType } from '@nestjs/swagger';
import { CreateRequestSampleChemicalDto } from './create-request_sample_chemical.dto';

export class UpdateRequestSampleChemicalDto extends PartialType(CreateRequestSampleChemicalDto) {}
