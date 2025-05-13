import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusSampleDto } from './create-status_sample.dto';

export class UpdateStatusSampleDto extends PartialType(CreateStatusSampleDto) {}
