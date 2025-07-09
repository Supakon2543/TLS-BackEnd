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
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('location')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ summary: 'Create or update a location' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, description: 'Location created or updated.' })
  @Post()
  createOrUpdate(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createOrUpdate(createLocationDto);
  }

  @ApiOperation({ summary: 'Create a new location' })
  @ApiBody({ type: CreateLocationDto })
  @ApiResponse({ status: 201, description: 'Location created.' })
  @Post('create')
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @ApiOperation({ summary: 'Get locations' })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of locations.' })
  @Get()
  getLocations(
    @Query() params: { id?: number; keyword?: string; status?: number },
  ) {
    return this.locationService.getLocations(params);
  }

  @ApiOperation({ summary: 'Get a location by id' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Location found.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a location' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateLocationDto })
  @ApiResponse({ status: 200, description: 'Location updated.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }

  @ApiOperation({ summary: 'Delete a location' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Location deleted.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationService.remove(+id);
  }
}
