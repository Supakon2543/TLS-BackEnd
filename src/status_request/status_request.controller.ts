import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { StatusRequestService } from './status_request.service';
import { CreateStatusRequestDto } from './dto/create-status_request.dto';
import { UpdateStatusRequestDto } from './dto/update-status_request.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('status-request')
export class StatusRequestController {
  constructor(private readonly statusRequestService: StatusRequestService) {}

    @Post('create')
    create(@Body() payload: CreateStatusRequestDto) {
      return this.statusRequestService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateStatusRequestDto/*, @Response() res: Response*/) {
      return this.statusRequestService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.statusRequestService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.statusRequestService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.statusRequestService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateStatusRequestDto) {
      return this.statusRequestService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.statusRequestService.remove(id);
    }
}
