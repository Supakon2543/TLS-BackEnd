import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentTypeService } from './equipment_type.service';
import { CreateEquipmentTypeDto } from './dto/create-equipment_type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment_type.dto';

@Controller('equipment-type')
export class EquipmentTypeController {
  constructor(private readonly equipmentTypeService: EquipmentTypeService) {}

  @Post()
  create(@Body() createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypeService.create(createEquipmentTypeDto);
  }

  @Get()
  findAll() {
    return this.equipmentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentTypeDto: UpdateEquipmentTypeDto) {
    return this.equipmentTypeService.update(+id, updateEquipmentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentTypeService.remove(+id);
  }
}
