import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ChemicalSampleDescriptionService } from './chemical_sample_description.service';
import { CreateChemicalSampleDescriptionDto } from './dto/create-chemical_sample_description.dto';
import { UpdateChemicalSampleDescriptionDto } from './dto/update-chemical_sample_description.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('chemical-sample_description')
export class ChemicalSampleDescriptionController {
  constructor(private readonly chemicalSampleDescriptionService: ChemicalSampleDescriptionService) {}

  @Post()
  create(@Body() createChemicalSampleDescriptionDto: CreateChemicalSampleDescriptionDto) {
    return this.chemicalSampleDescriptionService.createOrUpdate(createChemicalSampleDescriptionDto);
  }

  @Get()
  getChemicalSampleDescriptions(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.chemicalSampleDescriptionService.getChemicalSampleDescriptions(params);
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