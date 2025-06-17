import { PartialType } from '@nestjs/swagger';
import { CreateRequestSampleDto } from './create-request_sample.dto';

export class UpdateRequestSampleDto extends PartialType(CreateRequestSampleDto) {}
