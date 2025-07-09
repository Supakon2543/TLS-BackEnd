import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StatusSampleService } from './status_sample.service';
import { CreateStatusSampleDto } from './dto/create-status_sample.dto';
import { UpdateStatusSampleDto } from './dto/update-status_sample.dto';
import { AuthGuard } from '@nestjs/passport';


// @UseGuards(AuthGuard('jwt'))
@Controller('status-sample')
export class StatusSampleController {
  constructor(private readonly statusSampleService: StatusSampleService) {}

    @Post('create')
    create(@Body() payload: CreateStatusSampleDto) {
      return this.statusSampleService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateStatusSampleDto/*, @Response() res: Response*/) {
      return this.statusSampleService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.statusSampleService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.statusSampleService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.statusSampleService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateStatusSampleDto) {
      return this.statusSampleService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.statusSampleService.remove(id);
    }
}
