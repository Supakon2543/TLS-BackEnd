import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  createOrUpdate(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.createOrUpdate(createUnitDto);
  }

  @Post('create')
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get('get-units')
  getUnits(@Body() params: { id?: number; keyword?: string; status?: number }) {
    return this.unitService.getUnits(params);
  }

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(+id, updateUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitService.remove(+id);
  }
}
