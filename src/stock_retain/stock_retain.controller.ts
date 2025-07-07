import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StockRetainService } from './stock_retain.service';
import { CreateStockRetainDto } from './dto/create-stock_retain.dto';
import { UpdateStockRetainDto } from './dto/update-stock_retain.dto';
import { FilterRequestSamplesDto } from './dto/filter-request-samples.dto';

@ApiTags('stock-retain')
@Controller('stock-retain')
export class StockRetainController {
  constructor(private readonly stockRetainService: StockRetainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stock retain record' })
  @ApiResponse({
    status: 201,
    description: 'Stock retain record created successfully',
  })
  create(@Body() createStockRetainDto: CreateStockRetainDto) {
    return this.stockRetainService.create(createStockRetainDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a stock retain record' })
  @ApiResponse({
    status: 200,
    description: 'Stock retain record updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Stock retain record not found' })
  update(
    @Param('id') id: string,
    @Body() updateStockRetainDto: UpdateStockRetainDto,
  ) {
    return this.stockRetainService.update(+id, updateStockRetainDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stock retain record' })
  @ApiResponse({
    status: 200,
    description: 'Stock retain record deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Stock retain record not found' })
  remove(@Param('id') id: string) {
    return this.stockRetainService.remove(+id);
  }

  // Consolidated dropdown data endpoint
  @Get('dropdown')
  @ApiOperation({
    summary:
      'Get all dropdown data for stock retain (samples, materials, locations, status, lab sites, sections, boxes)',
  })
  @ApiResponse({
    status: 200,
    description:
      'Dropdown data including samples, materials, locations, status retain, lab sites, sections, and boxes',
    schema: {
      type: 'object',
      properties: {
        samples: { type: 'array', description: 'List of available samples' },
        materials: {
          type: 'array',
          description: 'List of available materials',
        },
        locations: {
          type: 'array',
          description: 'List of available locations',
        },
        statusRetain: { type: 'array', description: 'List of retain statuses' },
        labSites: { type: 'array', description: 'List of lab sites' },
        sections: {
          type: 'array',
          description: 'List of sections with location details',
        },
        boxes: {
          type: 'array',
          description: 'List of boxes with location and section details',
        },
      },
    },
  })
  getDropdownData() {
    return this.stockRetainService.getDropdownData();
  }

 @Get('multi')
async getRequestSampleDetails(
  @Query('id') id: string, // Accept comma-separated string of IDs
  @Query('is_select') isSelect?: string,
) {
  // Add validation for missing id
  if (!id) {
    throw new BadRequestException('Sample ID(s) are required');
  }

  // Parse comma-separated IDs into array of numbers
  const sampleIds = id.split(',').map(idStr => {
    const parsedId = parseInt(idStr.trim(), 10);
    if (isNaN(parsedId)) {
      throw new BadRequestException(`Invalid sample ID: ${idStr.trim()}`);
    }
    return parsedId;
  });

  console.log('Sample IDs:', sampleIds, 'Type:', typeof sampleIds);

  const isSelectBoolean = isSelect === 'true';

  return await this.stockRetainService.getRequestSampleDetails(
    sampleIds, // Pass the array of numbers
    isSelectBoolean,
  );
}

  @Get()
  async getRequestSamplesWithFilter(@Body() filters?: FilterRequestSamplesDto) {
    return await this.stockRetainService.getRequestSamples(filters);
  }

  @Get(':id')
  async getRequestSampleById(@Param('id') id: string) {
    const sampleId = parseInt(id, 10);
    if (isNaN(sampleId)) {
      throw new BadRequestException('Invalid sample ID');
    }
    return await this.stockRetainService.getRequestSampleById(sampleId);
  }

  // ...existing code...
}
