import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestDetailService } from './request_detail.service';
import { CreateRequestDetailDto } from './dto/create-request_detail.dto';
import { UpdateRequestDetailDto } from './dto/update-request_detail.dto';

@Controller('request-detail')
export class RequestDetailController {
  constructor(private readonly requestDetailService: RequestDetailService) {}

  @Post()
  create(@Body() createRequestDetailDto: CreateRequestDetailDto) {
    return this.requestDetailService.create(createRequestDetailDto);
  }

  @Get()
  findAll() {
    return this.requestDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestDetailDto: UpdateRequestDetailDto) {
    return this.requestDetailService.update(+id, updateRequestDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestDetailService.remove(+id);
  }
}
