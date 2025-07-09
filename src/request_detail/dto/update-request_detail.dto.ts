import { PartialType } from '@nestjs/swagger';
import { CreateRequestDetailDto } from './create-request_detail.dto';

export class UpdateRequestDetailDto extends PartialType(CreateRequestDetailDto) {}
