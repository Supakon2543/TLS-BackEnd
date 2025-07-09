import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestDetailAttachmentService } from './request_detail_attachment.service';
import { CreateRequestDetailAttachmentDto } from './dto/create-request_detail_attachment.dto';
import { UpdateRequestDetailAttachmentDto } from './dto/update-request_detail_attachment.dto';

@Controller('request-detail-attachment')
export class RequestDetailAttachmentController {
  constructor(private readonly requestDetailAttachmentService: RequestDetailAttachmentService) {}

  @Post()
  create(@Body() createRequestDetailAttachmentDto: CreateRequestDetailAttachmentDto) {
    return this.requestDetailAttachmentService.create(createRequestDetailAttachmentDto);
  }

  @Get()
  findAll() {
    return this.requestDetailAttachmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestDetailAttachmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDetailAttachmentDto: UpdateRequestDetailAttachmentDto) {
    return this.requestDetailAttachmentService.update(+id, updateRequestDetailAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestDetailAttachmentService.remove(+id);
  }
}
