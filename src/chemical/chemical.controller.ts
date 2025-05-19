import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChemicalService } from './chemical.service';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';

@Controller('chemical')
export class ChemicalController {
  constructor(private readonly chemicalService: ChemicalService) {}

  @Post('create')
  create(@Body() createChemicalDto: CreateChemicalDto) {
    return this.chemicalService.create(createChemicalDto);
  }

  @Post()
  createOrUpdate(@Body() createChemicalDto: CreateChemicalDto) {
    return this.chemicalService.createOrUpdate(createChemicalDto);
  }

  @Get()
  getChemicals(@Body() params: { id?: number; keyword?: string; status?: number }) {
    return this.chemicalService.getChemicals(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chemicalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChemicalDto: UpdateChemicalDto) {
    return this.chemicalService.update(+id, updateChemicalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chemicalService.remove(+id);
  }
}
