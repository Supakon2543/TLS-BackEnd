import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { SaveRequestDto } from './dto/save-request.dto';
import { DuplicateRequestDto } from './dto/duplicate-request.dto';
import { ListRequestDto } from './dto/list-request.dto';
import { SaveSampleDto } from './dto/save-sample.dto';
import { PartialTestDto } from './dto/partial-test.dto';

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

  @Post('save')
  async save(@Body() payload: SaveRequestDto, @Res() res: Response) {
    const result = await this.requestService.save(payload);
    return res.status(200).json(result);
  }

  @Post('accept')
  async accept(@Body() payload: any, @Res() res: Response) {
    const result = await this.requestService.accept(payload);
    return res.status(200).json(result);
  }

  @Post('sample/save')
  async save_sample(@Body() payload: SaveSampleDto, @Res() res: Response) {
    const result = await this.requestService.save_sample(payload);
    return res.status(200).json(result);
  }

  @Post('duplicate')
  async duplicate(@Body() payload: DuplicateRequestDto, @Res() res: Response) {
    const result = await this.requestService.duplicate(payload);
    return res.status(200).json(result);
  }

  @Post('cancel')
  async cancel(@Body() payload: any, @Res() res: Response) {
    const result = await this.requestService.cancel(payload);
    return res.status(200).json(result);
  }

  @Post('list')
  async list(@Body() payload: ListRequestDto, @Res() res: Response) {
    const result = await this.requestService.list(payload);
    return res.status(200).json(result);
  }

  @Post('partial/list')
  async partial_test(@Body() payload: PartialTestDto, @Res() res: Response) {
    const result = await this.requestService.partial_test(payload);
    return res.status(200).json(result);
  }

  @Post('test')
  async test(@Body() payload: { sender: string; subject: string; receivers: string; message: string }, @Res() res: Response) {
    const result = await this.requestService.test(payload);
    return res.status(200).json(result);
  }
}
