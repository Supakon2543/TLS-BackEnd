import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { SaveRequestDto } from './dto/save-request.dto';
import { DuplicateRequestDto } from './dto/duplicate-request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('create')
  create(@Body() payload: CreateRequestDto) {
    return this.requestService.create(payload);
  }

  // @Post()
  // create_update(/*@Request() req: Request, */@Body() payload: CreateRequestDto/*, @Response() res: Response*/) {
  //   return this.requestService.create_update(/*req, */payload/*, res*/);
  // }

  // @Get()
  // find(@Query() payload: {id?: number; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
  //   return this.requestService.find(payload/*req, res*/);
  // }

  @Get('all')
  findAll() {
    return this.requestService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.requestService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateRequestDto) {
    return this.requestService.update(+id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.requestService.remove(+id);
  }

  @Get('')
  get_info(@Query() params: { id?: number | string; }) {
    return this.requestService.get_info(params);
  }

  @Post('save-request')
  async save(@Body() payload: SaveRequestDto, @Res() res: Response) {
    const result = await this.requestService.save(payload);
    return res.status(200).json(result);
  }

  @Post('duplicate-request')
  async duplicate(@Body() payload: DuplicateRequestDto, @Res() res: Response) {
    const result = await this.requestService.duplicate(payload);
    return res.status(200).json(result);
  }

  @Post('cancel-request')
  async cancel(@Body() payload: any, @Res() res: Response) {
    const result = await this.requestService.cancel(payload);
    return res.status(200).json(result);
  }
}
