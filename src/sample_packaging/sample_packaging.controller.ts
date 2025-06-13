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
import { SamplePackagingService } from './sample_packaging.service';
import { CreateSamplePackagingDto } from './dto/create-sample_packaging.dto';
import { UpdateSamplePackagingDto } from './dto/update-sample_packaging.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('sample-packaging')
export class SamplePackagingController {
  constructor(private readonly samplePackagingService: SamplePackagingService) {}

  @Post('create')
  create(@Body() createSamplePackagingDto: CreateSamplePackagingDto) {
    return this.samplePackagingService.create(createSamplePackagingDto);
  }

  @Post()
  createOrUpdate(@Body() createSamplePackagingDto: CreateSamplePackagingDto) {
    return this.samplePackagingService.createOrUpdate(createSamplePackagingDto);
  }

  @Get()
  getSamplePackagings(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.samplePackagingService.getSamplePackagings(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.samplePackagingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSamplePackagingDto: UpdateSamplePackagingDto,
  ) {
    return this.samplePackagingService.update(+id, updateSamplePackagingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.samplePackagingService.remove(+id);
  }
}