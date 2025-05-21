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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { LineService } from './line.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('line')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  @Post()
  @ApiOperation({ summary: 'Create or update a line' })
  @ApiBody({ type: CreateLineDto })
  @ApiResponse({ status: 201, description: 'Line created or updated.' })
  createOrUpdate(@Body() createLineDto: CreateLineDto) {
    return this.lineService.createOrUpdate(createLineDto);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new line' })
  @ApiBody({ type: CreateLineDto })
  @ApiResponse({ status: 201, description: 'Line created.' })
  create(@Body() createLineDto: CreateLineDto) {
    return this.lineService.create(createLineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get lines with optional filters' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of lines.' })
  getLines(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.lineService.getLines(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a line by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Line found.' })
  findOne(@Param('id') id: string) {
    return this.lineService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a line by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateLineDto })
  @ApiResponse({ status: 200, description: 'Line updated.' })
  update(@Param('id') id: string, @Body() updateLineDto: UpdateLineDto) {
    return this.lineService.update(+id, updateLineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a line by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Line deleted.' })
  remove(@Param('id') id: string) {
    return this.lineService.remove(+id);
  }
}
