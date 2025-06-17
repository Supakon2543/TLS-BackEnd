import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestSampleMicrobiologyService } from './request_sample_microbiology.service';
import { CreateRequestSampleMicrobiologyDto } from './dto/create-request_sample_microbiology.dto';
import { UpdateRequestSampleMicrobiologyDto } from './dto/update-request_sample_microbiology.dto';

@Controller('request-sample-microbiology')
export class RequestSampleMicrobiologyController {
  constructor(private readonly requestSampleMicrobiologyService: RequestSampleMicrobiologyService) {}

  @Post()
  create(@Body() createRequestSampleMicrobiologyDto: CreateRequestSampleMicrobiologyDto) {
    return this.requestSampleMicrobiologyService.create(createRequestSampleMicrobiologyDto);
  }

  @Get()
  findAll() {
    return this.requestSampleMicrobiologyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestSampleMicrobiologyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestSampleMicrobiologyDto: UpdateRequestSampleMicrobiologyDto) {
    return this.requestSampleMicrobiologyService.update(+id, updateRequestSampleMicrobiologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestSampleMicrobiologyService.remove(+id);
  }
}
