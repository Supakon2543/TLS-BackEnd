import { PartialType } from '@nestjs/swagger';
import { CreateRequestSampleMicrobiologyDto } from './create-request_sample_microbiology.dto';

export class UpdateRequestSampleMicrobiologyDto extends PartialType(CreateRequestSampleMicrobiologyDto) {}
