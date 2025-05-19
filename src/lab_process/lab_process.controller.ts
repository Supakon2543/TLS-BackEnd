import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabProcessService } from './lab_process.service';
import { CreateLabProcessDto } from './dto/create-lab_process.dto';
import { UpdateLabProcessDto } from './dto/update-lab_process.dto';

@Controller('lab_process')
export class LabProcessController {
  constructor(private readonly labProcessService: LabProcessService) {}

  @Post()
  createOrUpdate(@Body() createLabProcessDto: CreateLabProcessDto) {
    return this.labProcessService.createOrUpdate(createLabProcessDto);
  }

  @Post('create')
  create(@Body() createLabProcessDto: CreateLabProcessDto) {
    return this.labProcessService.create(createLabProcessDto);
  }

  @Get()
  getLabProcesses(@Body() params: { id?: number; keyword?: string; status?: number }) {
    return this.labProcessService.getLabProcesses(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labProcessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabProcessDto: UpdateLabProcessDto) {
    return this.labProcessService.update(+id, updateLabProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labProcessService.remove(+id);
  }
}
