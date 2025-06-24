import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateStockRetainDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  request_sample_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  location_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  section_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  box_id: number;

  @ApiProperty({ example: 'ACTIVE', required: false })
  @IsOptional()
  @IsString()
  status_retain_id?: string;

  @ApiProperty({
    example: '2025-06-13T12:00:00.000Z',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  created_on?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiProperty({
    example: '2025-06-13T12:00:00.000Z',
    required: false,
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  updated_on?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}
