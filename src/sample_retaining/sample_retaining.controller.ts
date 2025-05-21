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
import { SampleRetainingService } from './sample_retaining.service';
import { CreateSampleRetainingDto } from './dto/create-sample_retaining.dto';
import { UpdateSampleRetainingDto } from './dto/update-sample_retaining.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('sample-retaining')
export class SampleRetainingController {
  constructor(
    private readonly sampleRetainingService: SampleRetainingService,
  ) {}

  @Post()
  createOrUpdate(@Body() createSampleRetainingDto: CreateSampleRetainingDto) {
    return this.sampleRetainingService.createOrUpdate(createSampleRetainingDto);
  }

  @Post('create')
  create(@Body() createSampleRetainingDto: CreateSampleRetainingDto) {
    return this.sampleRetainingService.create(createSampleRetainingDto);
  }

  @Get()
  getSampleRetainings(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.sampleRetainingService.getSampleRetainings(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleRetainingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSampleRetainingDto: UpdateSampleRetainingDto,
  ) {
    return this.sampleRetainingService.update(+id, updateSampleRetainingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleRetainingService.remove(+id);
  }
}
