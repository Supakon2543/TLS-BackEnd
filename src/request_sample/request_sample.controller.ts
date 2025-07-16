import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RequestSampleService } from './request_sample.service';
import { CreateRequestSampleDto } from './dto/create-request_sample.dto';
import { UpdateRequestSampleDto } from './dto/update-request_sample.dto';

@Controller('request-sample')
export class RequestSampleController {
  constructor(private readonly requestSampleService: RequestSampleService) {}

  @Get('label')
  async GET_SampleLabel(@Query('sample_id') sample_id: string) {
    return this.requestSampleService.GET_SampleLabel(parseInt(sample_id));
  }

  @Post()
  create(@Body() createRequestSampleDto: CreateRequestSampleDto) {
    return this.requestSampleService.create(createRequestSampleDto);
  }

  @Get()
  findAll() {
    return this.requestSampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestSampleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequestSampleDto: UpdateRequestSampleDto,
  ) {
    return this.requestSampleService.update(+id, updateRequestSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestSampleService.remove(+id);
  }
}
