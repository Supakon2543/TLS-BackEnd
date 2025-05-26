import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ActivityEquipmentService } from './activity_equipment.service';
import { CreateActivityEquipmentDto } from './dto/create-activity_equipment.dto';
import { UpdateActivityEquipmentDto } from './dto/update-activity_equipment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('activity_equipment')
export class ActivityEquipmentController {
  constructor(private readonly activityEquipmentService: ActivityEquipmentService) {}

    @Post('create')
    create(@Body() payload: CreateActivityEquipmentDto) {
      return this.activityEquipmentService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateActivityEquipmentDto/*, @Response() res: Response*/) {
      return this.activityEquipmentService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.activityEquipmentService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.activityEquipmentService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.activityEquipmentService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateActivityEquipmentDto) {
      return this.activityEquipmentService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.activityEquipmentService.remove(id);
    }
}
