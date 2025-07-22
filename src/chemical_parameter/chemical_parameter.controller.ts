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
import { ChemicalParameterService } from './chemical_parameter.service';
import { CreateChemicalParameterDto } from './dto/create-chemical_parameter.dto';
import { UpdateChemicalParameterDto } from './dto/update-chemical_parameter.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBody, ApiResponse , ApiQuery , ApiParam  } from '@nestjs/swagger';

@ApiTags('chemical_parameter')
// @UseGuards(AuthGuard('jwt'))
@Controller('chemical-parameter')
export class ChemicalParameterController {
  constructor(
    private readonly chemicalParameterService: ChemicalParameterService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create or update a chemical parameter' })
  @ApiBody({ type: CreateChemicalParameterDto })
  @ApiResponse({ status: 201, description: 'Chemical parameter created or updated.' })
  createOrUpdate(
    @Body() createChemicalParameterDto: CreateChemicalParameterDto,
  ) {
    return this.chemicalParameterService.createOrUpdate(
      createChemicalParameterDto,
    );
  }

  // @Post('create')
  // @ApiOperation({ summary: 'Create a new chemical parameter' })
  // @ApiBody({ type: CreateChemicalParameterDto })
  // @ApiResponse({ status: 201, description: 'Chemical parameter created.' })
  // create(@Body() createChemicalParameterDto: CreateChemicalParameterDto) {
  //   return this.chemicalParameterService.create(createChemicalParameterDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Get chemical parameters' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of chemical parameters.' })
  getChemicalParameters(
    @Query() params: { id?: number; keyword?: string; status?: number; material_id?: string },
  ) {
    return this.chemicalParameterService.getChemicalParameters(params);
  }

  @Get('map')
  @ApiOperation({ summary: 'Get chemical parameters' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of chemical parameters.' })
  getChemicalParametersWithSampleDescriptions(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.chemicalParameterService.getChemicalParametersWithSampleDescriptions(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a chemical parameter by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Chemical parameter found.' })
  findOne(@Param('id') id: string) {
    return this.chemicalParameterService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a chemical parameter' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateChemicalParameterDto })
  @ApiResponse({ status: 200, description: 'Chemical parameter updated.' })
  update(
    @Param('id') id: string,
    @Body() updateChemicalParameterDto: UpdateChemicalParameterDto,
  ) {
    return this.chemicalParameterService.update(
      +id,
      updateChemicalParameterDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a chemical parameter' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Chemical parameter deleted.' })
  remove(@Param('id') id: string) {
    return this.chemicalParameterService.remove(+id);
  }

}
