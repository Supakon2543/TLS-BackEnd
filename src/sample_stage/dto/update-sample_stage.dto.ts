import { PartialType } from '@nestjs/mapped-types';
import { CreateSampleStageDto } from './create-sample_stage.dto';

export class UpdateSampleStageDto extends PartialType(CreateSampleStageDto) {}
