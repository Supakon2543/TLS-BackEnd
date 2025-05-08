import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StorageUnitService } from './storage-unit.service';
import { CreateStorageUnitDto } from './dto/create-storage-unit.dto';
import { UpdateStorageUnitDto } from './dto/update-storage-unit.dto';

@Controller('storage-unit')
export class StorageUnitController {
  constructor(private readonly storageUnitService: StorageUnitService) {}

  @Post()
  create(@Body() createStorageUnitDto: CreateStorageUnitDto) {
    return this.storageUnitService.create(createStorageUnitDto);
  }

  @Get()
  findAll() {
    return this.storageUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageUnitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageUnitDto: UpdateStorageUnitDto) {
    return this.storageUnitService.update(+id, updateStorageUnitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageUnitService.remove(+id);
  }
}
