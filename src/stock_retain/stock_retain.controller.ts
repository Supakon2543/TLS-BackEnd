import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StockRetainService } from './stock_retain.service';
import { CreateStockRetainDto } from './dto/create-stock_retain.dto';
import { UpdateStockRetainDto } from './dto/update-stock_retain.dto';

@ApiTags('stock-retain')
@Controller('stock-retain')
export class StockRetainController {
  constructor(private readonly stockRetainService: StockRetainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stock retain record' })
  @ApiResponse({ status: 201, description: 'Stock retain record created successfully' })
  create(@Body() createStockRetainDto: CreateStockRetainDto) {
    return this.stockRetainService.create(createStockRetainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stock retain records' })
  @ApiResponse({ status: 200, description: 'List of all stock retain records' })
  findAll() {
    return this.stockRetainService.findAll();
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update a stock retain record' })
  @ApiResponse({ status: 200, description: 'Stock retain record updated successfully' })
  @ApiResponse({ status: 404, description: 'Stock retain record not found' })
  update(@Param('id') id: string, @Body() updateStockRetainDto: UpdateStockRetainDto) {
    return this.stockRetainService.update(+id, updateStockRetainDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stock retain record' })
  @ApiResponse({ status: 200, description: 'Stock retain record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Stock retain record not found' })
  remove(@Param('id') id: string) {
    return this.stockRetainService.remove(+id);
  }

  // Consolidated dropdown data endpoint
  @Get('dropdown')
  @ApiOperation({ summary: 'Get all dropdown data for stock retain (samples, materials, locations, status, lab sites, sections, boxes)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Dropdown data including samples, materials, locations, status retain, lab sites, sections, and boxes',
    schema: {
      type: 'object',
      properties: {
        samples: { type: 'array', description: 'List of available samples' },
        materials: { type: 'array', description: 'List of available materials' },
        locations: { type: 'array', description: 'List of available locations' },
        statusRetain: { type: 'array', description: 'List of retain statuses' },
        labSites: { type: 'array', description: 'List of lab sites' },
        sections: { type: 'array', description: 'List of sections with location details' },
        boxes: { type: 'array', description: 'List of boxes with location and section details' },
      }
    }
  })
  getDropdownData() {
    return this.stockRetainService.getDropdownData();
  }

  
}
