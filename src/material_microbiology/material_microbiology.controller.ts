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
import { MaterialMicrobiologyService } from './material_microbiology.service';
import { CreateMaterialMicrobiologyDto } from './dto/create-material_microbiology.dto';
import { UpdateMaterialMicrobiologyDto } from './dto/update-material_microbiology.dto';
import { AuthGuard } from '@nestjs/passport';
// @UseGuards(AuthGuard('jwt'))
@Controller('material-microbiology')
export class MaterialMicrobiologyController {
  constructor(
    private readonly materialMicrobiologyService: MaterialMicrobiologyService,
  ) {}

  @Post()
  createOrUpdate(
    @Body() createMaterialMicrobiologyDto: CreateMaterialMicrobiologyDto,
  ) {
    return this.materialMicrobiologyService.createOrUpdate(
      createMaterialMicrobiologyDto,
    );
  }

  @Post('create')
  create(@Body() createMaterialMicrobiologyDto: CreateMaterialMicrobiologyDto) {
    return this.materialMicrobiologyService.create(
      createMaterialMicrobiologyDto,
    );
  }

  @Get()
  getMaterialMicrobiologies(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.materialMicrobiologyService.getMaterialMicrobiologies(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialMicrobiologyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialMicrobiologyDto: UpdateMaterialMicrobiologyDto,
  ) {
    return this.materialMicrobiologyService.update(
      +id,
      updateMaterialMicrobiologyDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialMicrobiologyService.remove(+id);
  }
}
