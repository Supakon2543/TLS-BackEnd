import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabProcessService } from './lab_process.service';
import { CreateLabProcessDto } from './dto/create-lab_process.dto';
import { UpdateLabProcessDto } from './dto/update-lab_process.dto';

@Controller('lab-process')
export class LabProcessController {
  constructor(private readonly labProcessService: LabProcessService) {}

  @Post('create-or-update')
  createOrUpdate(@Body() createLabProcessDto: CreateLabProcessDto) {
    return this.labProcessService.createOrUpdate(createLabProcessDto);
  }

  @Post()
  create(@Body() createLabProcessDto: CreateLabProcessDto) {
    return this.labProcessService.create(createLabProcessDto);
  }

  @Get()
  findAll() {
    return this.labProcessService.findAll();
  }

  @Get('get-lab-processes')
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
