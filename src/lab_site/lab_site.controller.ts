import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request, UseGuards } from '@nestjs/common';
import { LabSiteService } from './lab_site.service';
import { CreateLabSiteDto } from './dto/create-lab_site.dto';
import { UpdateLabSiteDto } from './dto/update-lab_site.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('lab-site')
export class LabSiteController {
  constructor(private readonly labSiteService: LabSiteService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(/*@Request() req: Request, */@Body() payload: CreateLabSiteDto/*, @Response() res: Response*/) {
    return this.labSiteService.create(/*req, */payload/*, res*/);
  }

  @Post()
  create_update(/*@Request() req: Request, */@Body() payload: CreateLabSiteDto/*, @Response() res: Response*/) {
    return this.labSiteService.create_update(/*req, */payload/*, res*/);
  }

  @Get()
  find(/*@Request() req: Request, @Response() res: Response*/) {
    return this.labSiteService.find(/*req, res*/);
  }

  @Get('all')
  findAll(/*@Request() req: Request, @Response() res: Response*/) {
    return this.labSiteService.findAll(/*req, res*/);
  }

  @Get(':id')
  findOne(/*@Request() req: Request, */@Param('id') id: string/*, @Response() res: Response*/) {
    return this.labSiteService.findOne(/*req, */id/*, res*/);
  }

  @Patch(':id')
  update(/*@Request() req: Request, */@Param('id') id: string, @Body() payload: UpdateLabSiteDto/*, @Response() res: Response*/) {
    return this.labSiteService.update(/*req, */id, payload/*, res*/);
  }

  @Delete(':id')
  remove(/*@Request() req: Request, */@Param('id') id: string/*, @Response() res: Response*/) {
    return this.labSiteService.remove(/*req, */id/*, res*/);
  }
}
