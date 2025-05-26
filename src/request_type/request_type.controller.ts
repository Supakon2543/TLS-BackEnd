import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RequestTypeService } from './request_type.service';
import { CreateRequestTypeDto } from './dto/create-request_type.dto';
import { UpdateRequestTypeDto } from './dto/update-request_type.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('request_type')
export class RequestTypeController {
  constructor(private readonly requestTypeService: RequestTypeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() payload: CreateRequestTypeDto) {
    return this.requestTypeService.create(payload);
  }

  @Post()
  create_update(/*@Request() req: Request, */@Body() payload: CreateRequestTypeDto/*, @Response() res: Response*/) {
    return this.requestTypeService.create_update(/*req, */payload/*, res*/);
  }

  @Get()
  find(@Query() payload: {id?: string; status?: number;}) {
    return this.requestTypeService.find(payload/*req, res*/);
  }

  @Get('all')
  findAll() {
    return this.requestTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateRequestTypeDto) {
    return this.requestTypeService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestTypeService.remove(id);
  }
}
