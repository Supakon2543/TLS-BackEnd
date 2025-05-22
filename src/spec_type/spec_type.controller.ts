import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecTypeService } from './spec_type.service';
import { CreateSpecTypeDto } from './dto/create-spec_type.dto';
import { UpdateSpecTypeDto } from './dto/update-spec_type.dto';

@Controller('spec_type')
export class SpecTypeController {
  constructor(private readonly specTypeService: SpecTypeService) {}

    @Post('create')
    create(@Body() payload: CreateSpecTypeDto) {
      return this.specTypeService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateSpecTypeDto/*, @Response() res: Response*/) {
      return this.specTypeService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      return this.specTypeService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.specTypeService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.specTypeService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateSpecTypeDto) {
      return this.specTypeService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.specTypeService.remove(id);
    }
}
