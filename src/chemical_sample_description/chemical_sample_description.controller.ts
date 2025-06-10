import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChemicalSampleDescriptionService } from './chemical_sample_description.service';
import { CreateChemicalSampleDescriptionDto } from './dto/create-chemical_sample_description.dto';
import { UpdateChemicalSampleDescriptionDto } from './dto/update-chemical_sample_description.dto';

@Controller('chemical-sample-description')
export class ChemicalSampleDescriptionController {
  constructor(private readonly chemicalSampleDescriptionService: ChemicalSampleDescriptionService) {}

  @Post()
  create(@Body() createChemicalSampleDescriptionDto: CreateChemicalSampleDescriptionDto) {
    return this.chemicalSampleDescriptionService.create(createChemicalSampleDescriptionDto);
  }

  @Get()
  findAll() {
    return this.chemicalSampleDescriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chemicalSampleDescriptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChemicalSampleDescriptionDto: UpdateChemicalSampleDescriptionDto) {
    return this.chemicalSampleDescriptionService.update(+id, updateChemicalSampleDescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chemicalSampleDescriptionService.remove(+id);
  }
}
