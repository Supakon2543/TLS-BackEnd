import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StatusEquipmentService } from './status_equipment.service';
import { CreateStatusEquipmentDto } from './dto/create-status_equipment.dto';
import { UpdateStatusEquipmentDto } from './dto/update-status_equipment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('status_equipment')
export class StatusEquipmentController {
  constructor(private readonly statusEquipmentService: StatusEquipmentService) {}

    @Post('create')
    create(@Body() payload: CreateStatusEquipmentDto) {
      return this.statusEquipmentService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateStatusEquipmentDto/*, @Response() res: Response*/) {
      return this.statusEquipmentService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.statusEquipmentService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.statusEquipmentService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.statusEquipmentService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateStatusEquipmentDto) {
      return this.statusEquipmentService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.statusEquipmentService.remove(id);
    }
}
