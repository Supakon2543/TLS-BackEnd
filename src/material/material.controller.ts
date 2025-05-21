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
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  createOrUpdate(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.createOrUpdate(createMaterialDto);
  }

  @Post('create')
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialService.create(createMaterialDto);
  }

  @Post('insert')
  test(@Body() payload: { id: number, name: string, test_report_name: string, status: boolean }) {
    return this.materialService.insert_material(payload);
  }

  @Get('get')
  get_test(@Body() payload: { id: number, keyword: string, status: number }) {
    return this.materialService.get_material(payload);
  }

  @Get()
  getMaterials(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.materialService.getMaterials(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialService.update(+id, updateMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialService.remove(+id);
  }
}
