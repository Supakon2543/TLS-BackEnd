import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

    @Post('create')
    create(@Body() payload: CreateStateDto) {
      return this.stateService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateStateDto/*, @Response() res: Response*/) {
      return this.stateService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      return this.stateService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.stateService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.stateService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateStateDto) {
      return this.stateService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.stateService.remove(id);
    }
}
