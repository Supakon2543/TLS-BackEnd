import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabTestService } from './lab_test.service';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';

@Controller('lab-test')
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

    @Post('create')
    create(@Body() payload: CreateLabTestDto) {
      return this.labTestService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateLabTestDto/*, @Response() res: Response*/) {
      return this.labTestService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      return this.labTestService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.labTestService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.labTestService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateLabTestDto) {
      return this.labTestService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.labTestService.remove(id);
    }
}
