import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MicrobiologyParameterService } from './microbiology_parameter.service';
import { CreateMicrobiologyParameterDto } from './dto/create-microbiology_parameter.dto';
import { UpdateMicrobiologyParameterDto } from './dto/update-microbiology_parameter.dto';

@Controller('microbiology-parameter')
export class MicrobiologyParameterController {
  constructor(private readonly microbiologyParameterService: MicrobiologyParameterService) {}

  @Post()
  create(@Body() createMicrobiologyParameterDto: CreateMicrobiologyParameterDto) {
    return this.microbiologyParameterService.create(createMicrobiologyParameterDto);
  }

  @Post('create-or-update')
  createOrUpdate(@Body() createMicrobiologyParameterDto: CreateMicrobiologyParameterDto) {
    return this.microbiologyParameterService.createOrUpdate(createMicrobiologyParameterDto);
  }

  @Get('get-microbiology-parameters')
  getMicrobiologyParameters(@Body() params: { id?: number; keyword?: string; status?: number }) {
    return this.microbiologyParameterService.getMicrobiologyParameters(params);
  }

  @Get()
  findAll() {
    return this.microbiologyParameterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.microbiologyParameterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMicrobiologyParameterDto: UpdateMicrobiologyParameterDto) {
    return this.microbiologyParameterService.update(+id, updateMicrobiologyParameterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.microbiologyParameterService.remove(+id);
  }
}
