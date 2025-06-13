import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SampleTypeService } from './sample_type.service';
import { CreateSampleTypeDto } from './dto/create-sample_type.dto';
import { UpdateSampleTypeDto } from './dto/update-sample_type.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('sample-type')
export class SampleTypeController {
  constructor(private readonly sampleTypeService: SampleTypeService) {}

    @Post('create')
    create(@Body() payload: CreateSampleTypeDto) {
      return this.sampleTypeService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateSampleTypeDto/*, @Response() res: Response*/) {
      return this.sampleTypeService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.sampleTypeService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.sampleTypeService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sampleTypeService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateSampleTypeDto) {
      return this.sampleTypeService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sampleTypeService.remove(id);
    }
}
