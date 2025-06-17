import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestSampleItemService } from './request_sample_item.service';
import { CreateRequestSampleItemDto } from './dto/create-request_sample_item.dto';
import { UpdateRequestSampleItemDto } from './dto/update-request_sample_item.dto';

@Controller('request-sample-item')
export class RequestSampleItemController {
  constructor(private readonly requestSampleItemService: RequestSampleItemService) {}

  @Post()
  create(@Body() createRequestSampleItemDto: CreateRequestSampleItemDto) {
    return this.requestSampleItemService.create(createRequestSampleItemDto);
  }

  @Get()
  findAll() {
    return this.requestSampleItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestSampleItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestSampleItemDto: UpdateRequestSampleItemDto) {
    return this.requestSampleItemService.update(+id, updateRequestSampleItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestSampleItemService.remove(+id);
  }
}
