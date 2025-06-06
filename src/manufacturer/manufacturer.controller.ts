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
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Post()
  createOrUpdate(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.createOrUpdate(createManufacturerDto);
  }

  @Post('create')
  create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return this.manufacturerService.create(createManufacturerDto);
  }

  @Get()
  getManufacturers(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.manufacturerService.getManufacturers(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return this.manufacturerService.update(+id, updateManufacturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturerService.remove(+id);
  }
}
