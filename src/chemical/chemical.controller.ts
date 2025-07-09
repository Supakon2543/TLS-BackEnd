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
import { ChemicalService } from './chemical.service';
import { CreateChemicalDto } from './dto/create-chemical.dto';
import { UpdateChemicalDto } from './dto/update-chemical.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

// @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('bearer')
@ApiTags('chemical')
@Controller('chemical')
export class ChemicalController {

  constructor(private readonly chemicalService: ChemicalService) {}

  @ApiOperation({ summary: 'Create a new chemical' })
  @Post('create')
  create(@Body() createChemicalDto: CreateChemicalDto) {
    return this.chemicalService.create(createChemicalDto);
  }

  @ApiOperation({ summary: 'Create or update a chemical' })
  @Post()
  createOrUpdate(@Body() createChemicalDto: CreateChemicalDto) {
    return this.chemicalService.createOrUpdate(createChemicalDto);
  }

  @ApiOperation({ summary: 'Get chemicals with optional filters' })
  @Get()
  getChemicals(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.chemicalService.getChemicals(params);
  }

  @ApiOperation({ summary: 'Update a chemical by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChemicalDto: UpdateChemicalDto,
  ) {
    return this.chemicalService.update(+id, updateChemicalDto);
  }

  @ApiOperation({ summary: 'Delete a chemical by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chemicalService.remove(+id);
  }
}
