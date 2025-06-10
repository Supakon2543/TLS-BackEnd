import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SampleDescriptionService } from './sample_description.service';
import { CreateSampleDescriptionDto } from './dto/create-sample_description.dto';
import { UpdateSampleDescriptionDto } from './dto/update-sample_description.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('sample_description')
export class SampleDescriptionController {
  constructor(private readonly sampleDescriptionService: SampleDescriptionService) {}

    @Post('create')
    create(@Body() payload: CreateSampleDescriptionDto) {
      return this.sampleDescriptionService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateSampleDescriptionDto/*, @Response() res: Response*/) {
      return this.sampleDescriptionService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.sampleDescriptionService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.sampleDescriptionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sampleDescriptionService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateSampleDescriptionDto) {
      return this.sampleDescriptionService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sampleDescriptionService.remove(id);
    }
}
