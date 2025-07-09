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
import { EquipmentTypeService } from './equipment_type.service';
import { CreateEquipmentTypeDto } from './dto/create-equipment_type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment_type.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('equipment_type')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('equipment-type')
export class EquipmentTypeController {
  constructor(private readonly equipmentTypeService: EquipmentTypeService) {}

  @ApiOperation({ summary: 'Create or update equipment type' })
  @ApiBody({ type: CreateEquipmentTypeDto })
  @ApiResponse({ status: 201, description: 'Created or updated successfully.' })
  @Post()
  createOrUpdate(@Body() createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypeService.createOrUpdate(createEquipmentTypeDto);
  }

  @ApiOperation({ summary: 'Create equipment type' })
  @ApiBody({ type: CreateEquipmentTypeDto })
  @ApiResponse({ status: 201, description: 'Created successfully.' })
  @Post('create')
  create(@Body() createEquipmentTypeDto: CreateEquipmentTypeDto) {
    return this.equipmentTypeService.create(createEquipmentTypeDto);
  }

  @ApiOperation({ summary: 'Get equipment types' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of equipment types.' })
  @Get()
  getChemicalParameters(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.equipmentTypeService.getEquipmentTypes(params);
  }

  @ApiOperation({ summary: 'Get equipment type by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Equipment type found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update equipment type' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateEquipmentTypeDto })
  @ApiResponse({ status: 200, description: 'Updated successfully.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentTypeDto: UpdateEquipmentTypeDto,
  ) {
    return this.equipmentTypeService.update(+id, updateEquipmentTypeDto);
  }

  @ApiOperation({ summary: 'Delete equipment type' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Deleted successfully.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentTypeService.remove(+id);
  }
}
