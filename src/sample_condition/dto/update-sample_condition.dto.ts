import { PartialType } from '@nestjs/mapped-types';
import { CreateSampleConditionDto } from './create-sample_condition.dto';

export class UpdateSampleConditionDto extends PartialType(CreateSampleConditionDto) {}
