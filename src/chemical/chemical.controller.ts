import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChemicalService } from './chemical.service';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';

@Controller('chemical')
export class ChemicalController {
  constructor(private readonly chemicalService: ChemicalService) {}

  @Post()
  create(@Body() createChemicalDto: CreateChemicalDto) {
    return this.chemicalService.create(createChemicalDto);
  }

  @Post('create-or-update')
  createOrUpdate(@Body() createChemicalDto: CreateChemicalDto) {
    return this.chemicalService.createOrUpdate(createChemicalDto);
  }

  @Get('get-chemicals')
  getChemicals(@Body() params: { id?: number; keyword?: string; status?: number }) {
    return this.chemicalService.getChemicals(params);
  }

  @Get()
  findAll() {
    return this.chemicalService.findAll();
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
