import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateChemicalParameterDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  order: number;

  @ApiProperty({ maxLength: 50, example: 'pH' })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiPropertyOptional({ example: 0.5 })
  @IsOptional()
  @IsDecimal()
  request_min?: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  unit_id: number;

  @ApiProperty({ example: 'sampleType123' })
  @IsString()
  sample_type_id: string;

  @ApiProperty({ example: 'specType456' })
  @IsString()
  spec_type_id: string;

  @ApiProperty({ maxLength: 100, example: 'Spec description' })
  @IsString()
  @Length(1, 100)
  spec: string;

  @ApiProperty({ example: 6.5 })
  @IsDecimal()
  spec_min: number;

  @ApiProperty({ example: 7.5 })
  @IsDecimal()
  spec_max: number;

  @ApiProperty({ example: 6.0 })
  @IsDecimal()
  warning_min: number;

  @ApiProperty({ example: 8.0 })
  @IsDecimal()
  warning_max: number;

  @ApiProperty({ example: 'finalResultValue' })
  @IsString()
  final_result: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  decimal: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_enter_spec_min: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_enter_spec_max: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_enter_warning_min: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_enter_warning_max: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ example: 1001 })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ example: 1002 })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}
