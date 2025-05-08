import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialMicrobiologyService } from './material_microbiology.service';
import { CreateMaterialMicrobiologyDto } from './dto/create-material_microbiology.dto';
import { UpdateMaterialMicrobiologyDto } from './dto/update-material_microbiology.dto';

@Controller('material-microbiology')
export class MaterialMicrobiologyController {
  constructor(private readonly materialMicrobiologyService: MaterialMicrobiologyService) {}

  @Post()
  create(@Body() createMaterialMicrobiologyDto: CreateMaterialMicrobiologyDto) {
    return this.materialMicrobiologyService.create(createMaterialMicrobiologyDto);
  }

  @Get()
  findAll() {
    return this.materialMicrobiologyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialMicrobiologyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialMicrobiologyDto: UpdateMaterialMicrobiologyDto) {
    return this.materialMicrobiologyService.update(+id, updateMaterialMicrobiologyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialMicrobiologyService.remove(+id);
  }
}
