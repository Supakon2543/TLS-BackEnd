import { ApiProperty } from '@nestjs/swagger';

export class StockRetain {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  request_sample_id: number;

  @ApiProperty({ example: 1 })
  location_id: number;

  @ApiProperty({ example: 1 })
  section_id: number;

  @ApiProperty({ example: 1 })
  box_id: number;

  @ApiProperty({ example: 'ACTIVE', required: false })
  status_retain_id?: string;

  @ApiProperty({ example: '2025-06-13T12:00:00.000Z', required: false, type: String, format: 'date-time' })
  created_on?: string;

  @ApiProperty({ example: 1, required: false })
  created_by?: number;

  @ApiProperty({ example: '2025-06-13T12:00:00.000Z', required: false, type: String, format: 'date-time' })
  updated_on?: string;

  @ApiProperty({ example: 1, required: false })
  updated_by?: number;
}