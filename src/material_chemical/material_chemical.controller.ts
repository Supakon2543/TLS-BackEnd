import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialChemicalService } from './material_chemical.service';
import { CreateMaterialChemicalDto } from './dto/create-material_chemical.dto';
import { UpdateMaterialChemicalDto } from './dto/update-material_chemical.dto';

@Controller('material_chemical')
export class MaterialChemicalController {
  constructor(private readonly materialChemicalService: MaterialChemicalService) {}


  @Post()
  create(@Body() createMaterialChemicalDto: CreateMaterialChemicalDto) {
    return this.materialChemicalService.create(createMaterialChemicalDto);
  }

  @Get()
  getMaterialChemicals(@Param() params: { id?: number; keyword?: string; status?: number }) {
    return this.materialChemicalService.getMaterialChemicals(params);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialChemicalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialChemicalDto: UpdateMaterialChemicalDto) {
    return this.materialChemicalService.update(+id, updateMaterialChemicalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialChemicalService.remove(+id);
  }
}
