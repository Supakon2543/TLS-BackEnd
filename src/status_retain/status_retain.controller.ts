import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StatusRetainService } from './status_retain.service';
import { CreateStatusRetainDto } from './dto/create-status_retain.dto';
import { UpdateStatusRetainDto } from './dto/update-status_retain.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('status-retain')
export class StatusRetainController {
  constructor(private readonly statusRetainService: StatusRetainService) {}

    @Post('create')
    create(@Body() payload: CreateStatusRetainDto) {
      return this.statusRetainService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateStatusRetainDto/*, @Response() res: Response*/) {
      return this.statusRetainService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.statusRetainService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.statusRetainService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.statusRetainService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateStatusRetainDto) {
      return this.statusRetainService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.statusRetainService.remove(id);
    }
}
