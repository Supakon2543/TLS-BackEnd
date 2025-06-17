import { PartialType } from '@nestjs/swagger';
import { CreateRequestDetailAttachmentDto } from './create-request_detail_attachment.dto';

export class UpdateRequestDetailAttachmentDto extends PartialType(CreateRequestDetailAttachmentDto) {}
