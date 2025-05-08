import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChemicalParameterService } from './chemical_parameter.service';
import { CreateChemicalParameterDto } from './dto/create-chemical_parameter.dto';
import { UpdateChemicalParameterDto } from './dto/update-chemical_parameter.dto';

@Controller('chemical-parameter')
export class ChemicalParameterController {
  constructor(private readonly chemicalParameterService: ChemicalParameterService) {}

  @Post()
  create(@Body() createChemicalParameterDto: CreateChemicalParameterDto) {
    return this.chemicalParameterService.create(createChemicalParameterDto);
  }

  @Get()
  findAll() {
    return this.chemicalParameterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chemicalParameterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChemicalParameterDto: UpdateChemicalParameterDto) {
    return this.chemicalParameterService.update(+id, updateChemicalParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chemicalParameterService.remove(+id);
  }
}
