import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Post()
  createOrUpdate(@Body() createBoxDto: CreateBoxDto) {
    return this.boxService.createOrUpdate(createBoxDto);
  }


  @Get()
  getBoxes(@Param() params: { id?: number; keyword?: string; status?: number }) {
    return this.boxService.getBoxes(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxService.update(+id, updateBoxDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boxService.remove(+id);
  }
}
