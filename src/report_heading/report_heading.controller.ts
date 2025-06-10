import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ReportHeadingService } from './report_heading.service';
import { CreateReportHeadingDto } from './dto/create-report_heading.dto';
import { UpdateReportHeadingDto } from './dto/update-report_heading.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('report_heading')
export class ReportHeadingController {
  constructor(private readonly reportHeadingService: ReportHeadingService) {}

    @Post('create')
    create(@Body() payload: CreateReportHeadingDto) {
      return this.reportHeadingService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateReportHeadingDto/*, @Response() res: Response*/) {
      return this.reportHeadingService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.reportHeadingService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.reportHeadingService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.reportHeadingService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateReportHeadingDto) {
      return this.reportHeadingService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.reportHeadingService.remove(id);
    }
}
