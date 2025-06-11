import { PartialType } from '@nestjs/swagger';
import { CreateSamplePackagingDto } from './create-sample_packaging.dto';

export class UpdateSamplePackagingDto extends PartialType(CreateSamplePackagingDto) {}
