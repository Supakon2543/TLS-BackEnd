import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TestReportFormatService } from './test_report_format.service';
import { CreateTestReportFormatDto } from './dto/create-test_report_format.dto';
import { UpdateTestReportFormatDto } from './dto/update-test_report_format.dto';
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@Controller('test-report_format')
export class TestReportFormatController {
  constructor(private readonly testReportFormatService: TestReportFormatService) {}

    @Post('create')
    create(@Body() payload: CreateTestReportFormatDto) {
      return this.testReportFormatService.create(payload);
    }
  
    @Post()
    create_update(/*@Request() req: Request, */@Body() payload: CreateTestReportFormatDto/*, @Response() res: Response*/) {
      return this.testReportFormatService.create_update(/*req, */payload/*, res*/);
    }
  
    @Get()
    find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      return this.testReportFormatService.find(payload/*req, res*/);
    }
  
    @Get('all')
    findAll() {
      return this.testReportFormatService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.testReportFormatService.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: UpdateTestReportFormatDto) {
      return this.testReportFormatService.update(id, payload);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.testReportFormatService.remove(id);
    }
}
