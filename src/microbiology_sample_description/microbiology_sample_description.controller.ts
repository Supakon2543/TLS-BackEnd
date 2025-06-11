import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MicrobiologySampleDescriptionService } from './microbiology_sample_description.service';
import { CreateMicrobiologySampleDescriptionDto } from './dto/create-microbiology_sample_description.dto';
import { UpdateMicrobiologySampleDescriptionDto } from './dto/update-microbiology_sample_description.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('microbiology_sample_description')
export class MicrobiologySampleDescriptionController {
  constructor(private readonly microbiologySampleDescriptionService: MicrobiologySampleDescriptionService) {}

  @Post()
  create(@Body() createMicrobiologySampleDescriptionDto: CreateMicrobiologySampleDescriptionDto) {
    return this.microbiologySampleDescriptionService.createOrUpdate(createMicrobiologySampleDescriptionDto);
  }

  @Get()
  getMicrobiologySampleDescriptions(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.microbiologySampleDescriptionService.getMicrobiologySampleDescriptions(params);
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