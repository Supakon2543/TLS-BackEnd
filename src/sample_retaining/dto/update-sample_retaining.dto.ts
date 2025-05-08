import { PartialType } from '@nestjs/mapped-types';
import { CreateSampleRetainingDto } from './create-sample_retaining.dto';

export class UpdateSampleRetainingDto extends PartialType(CreateSampleRetainingDto) {}
