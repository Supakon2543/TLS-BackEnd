import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SampleStageService } from './sample_stage.service';
import { CreateSampleStageDto } from './dto/create-sample_stage.dto';
import { UpdateSampleStageDto } from './dto/update-sample_stage.dto';

@Controller('sample-stage')
export class SampleStageController {
  constructor(private readonly sampleStageService: SampleStageService) {}

  @Post()
  create(@Body() createSampleStageDto: CreateSampleStageDto) {
    return this.sampleStageService.create(createSampleStageDto);
  }

  @Get()
  findAll() {
    return this.sampleStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleStageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleStageDto: UpdateSampleStageDto) {
    return this.sampleStageService.update(+id, updateSampleStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleStageService.remove(+id);
  }
}
