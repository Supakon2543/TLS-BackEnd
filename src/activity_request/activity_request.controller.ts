import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ActivityRequestService } from './activity_request.service';
import { CreateActivityRequestDto } from './dto/create-activity_request.dto';
import { UpdateActivityRequestDto } from './dto/update-activity_request.dto';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('activity-request')
export class ActivityRequestController {
  constructor(private readonly activityRequestService: ActivityRequestService) {}

    @Post('create')
    create(@Body() payload: CreateActivityRequestDto) {
      return this.activityRequestService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateActivityRequestDto/*, @Response() res: Response*/) {
      return this.activityRequestService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.activityRequestService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.activityRequestService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.activityRequestService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateActivityRequestDto) {
      return this.activityRequestService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.activityRequestService.remove(id);
    }
}
