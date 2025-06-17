import { PartialType } from '@nestjs/swagger';
import { CreateRequestSampleItemDto } from './create-request_sample_item.dto';

export class UpdateRequestSampleItemDto extends PartialType(CreateRequestSampleItemDto) {}
