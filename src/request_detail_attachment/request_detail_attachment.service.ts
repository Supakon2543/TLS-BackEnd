import { Injectable } from '@nestjs/common';
import { CreateRequestDetailAttachmentDto } from './dto/create-request_detail_attachment.dto';
import { UpdateRequestDetailAttachmentDto } from './dto/update-request_detail_attachment.dto';

@Injectable()
export class RequestDetailAttachmentService {
  create(createRequestDetailAttachmentDto: CreateRequestDetailAttachmentDto) {
    return 'This action adds a new requestDetailAttachment';
  }

  findAll() {
    return `This action returns all requestDetailAttachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestDetailAttachment`;
  }

  update(id: number, updateRequestDetailAttachmentDto: UpdateRequestDetailAttachmentDto) {
    return `This action updates a #${id} requestDetailAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestDetailAttachment`;
  }
}
