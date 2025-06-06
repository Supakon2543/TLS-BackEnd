import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('bearer')
@UseGuards(AuthGuard('jwt'))
@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @ApiOperation({ summary: 'create new box' })
  @Post()
  createOrUpdate(@Body() createBoxDto: CreateBoxDto) {
    return this.boxService.createOrUpdate(createBoxDto);
  }

  @ApiOperation({ summary: 'get box with filter' })
  @Get()
  getBoxes(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.boxService.getBoxes(params);
  }

  @ApiOperation({ summary: 'get box by id ' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boxService.findOne(+id);
  }

  @ApiOperation({ summary: 'update box by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoxDto: UpdateBoxDto) {
    return this.boxService.update(+id, updateBoxDto);
  }

  @ApiOperation({ summary: 'delete box by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boxService.remove(+id);
  }
}
