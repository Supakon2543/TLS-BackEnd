import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestEmailService } from './request_email.service';
import { CreateRequestEmailDto } from './dto/create-request_email.dto';
import { UpdateRequestEmailDto } from './dto/update-request_email.dto';

@Controller('request-email')
export class RequestEmailController {
  constructor(private readonly requestEmailService: RequestEmailService) {}

  @Post()
  create(@Body() createRequestEmailDto: CreateRequestEmailDto) {
    return this.requestEmailService.create(createRequestEmailDto);
  }

  @Get()
  findAll() {
    return this.requestEmailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestEmailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestEmailDto: UpdateRequestEmailDto) {
    return this.requestEmailService.update(+id, updateRequestEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestEmailService.remove(+id);
  }
}
