import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AccreditedService } from './accredited.service';
import { CreateAccreditedDto } from './dto/create-accredited.dto';
import { UpdateAccreditedDto } from './dto/update-accredited.dto';

@Controller('accredited')
export class AccreditedController {
  constructor(private readonly accreditedService: AccreditedService) {}

    @Post('create')
    create(@Body() payload: CreateAccreditedDto) {
      return this.accreditedService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateAccreditedDto/*, @Response() res: Response*/) {
      return this.accreditedService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.accreditedService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.accreditedService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.accreditedService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateAccreditedDto) {
      return this.accreditedService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.accreditedService.remove(id);
    }
}
