import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestSampleChemicalService } from './request_sample_chemical.service';
import { CreateRequestSampleChemicalDto } from './dto/create-request_sample_chemical.dto';
import { UpdateRequestSampleChemicalDto } from './dto/update-request_sample_chemical.dto';

@Controller('request-sample-chemical')
export class RequestSampleChemicalController {
  constructor(private readonly requestSampleChemicalService: RequestSampleChemicalService) {}

  @Post()
  create(@Body() createRequestSampleChemicalDto: CreateRequestSampleChemicalDto) {
    return this.requestSampleChemicalService.create(createRequestSampleChemicalDto);
  }

  @Get()
  findAll() {
    return this.requestSampleChemicalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestSampleChemicalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestSampleChemicalDto: UpdateRequestSampleChemicalDto) {
    return this.requestSampleChemicalService.update(+id, updateRequestSampleChemicalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestSampleChemicalService.remove(+id);
  }
}
