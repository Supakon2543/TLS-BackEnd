import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { SampleConditionService } from './sample_condition.service';
import { CreateSampleConditionDto } from './dto/create-sample_condition.dto';
import { UpdateSampleConditionDto } from './dto/update-sample_condition.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('sample-condition')
export class SampleConditionController {
  constructor(private readonly sampleConditionService: SampleConditionService) {}

    @Post('create')
    create(@Body() payload: CreateSampleConditionDto) {
      return this.sampleConditionService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateSampleConditionDto/*, @Response() res: Response*/) {
      return this.sampleConditionService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.sampleConditionService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.sampleConditionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.sampleConditionService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateSampleConditionDto) {
      return this.sampleConditionService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sampleConditionService.remove(id);
    }
}
