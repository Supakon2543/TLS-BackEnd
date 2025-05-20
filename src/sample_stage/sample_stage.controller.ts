import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SampleStageService } from './sample_stage.service';
import { CreateSampleStageDto } from './dto/create-sample_stage.dto';
import { UpdateSampleStageDto } from './dto/update-sample_stage.dto';

@Controller('sample_stage')
export class SampleStageController {
  constructor(private readonly sampleStageService: SampleStageService) {}

  @Post()
  createOrUpdate(@Body() createSampleStageDto: CreateSampleStageDto) {
    return this.sampleStageService.createOrUpdate(createSampleStageDto);
  }

  @Get()
  getSampleStages(@Query() params: { id?: number; keyword?: string; status?: number }) {
    return this.sampleStageService.getSampleStages(params);
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
