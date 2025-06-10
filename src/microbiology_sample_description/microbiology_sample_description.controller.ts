import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicrobiologySampleDescriptionService } from './microbiology_sample_description.service';
import { CreateMicrobiologySampleDescriptionDto } from './dto/create-microbiology_sample_description.dto';
import { UpdateMicrobiologySampleDescriptionDto } from './dto/update-microbiology_sample_description.dto';

@Controller('microbiology-sample-description')
export class MicrobiologySampleDescriptionController {
  constructor(private readonly microbiologySampleDescriptionService: MicrobiologySampleDescriptionService) {}

  @Post()
  create(@Body() createMicrobiologySampleDescriptionDto: CreateMicrobiologySampleDescriptionDto) {
    return this.microbiologySampleDescriptionService.create(createMicrobiologySampleDescriptionDto);
  }

  @Get()
  findAll() {
    return this.microbiologySampleDescriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microbiologySampleDescriptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMicrobiologySampleDescriptionDto: UpdateMicrobiologySampleDescriptionDto) {
    return this.microbiologySampleDescriptionService.update(+id, updateMicrobiologySampleDescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microbiologySampleDescriptionService.remove(+id);
  }
}
