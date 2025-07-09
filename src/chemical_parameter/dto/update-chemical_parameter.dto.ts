import { PartialType } from '@nestjs/mapped-types';
import { CreateChemicalParameterDto } from './create-chemical_parameter.dto';
import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateChemicalParameterDto {
  @ApiProperty({ example: 0, description: 'User 0 for create', type: 'number' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  order: number;

  @ApiProperty({ example: 'pH' })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ required: false, example: 7.0 })
  @IsOptional()
  @IsDecimal()
  request_min?: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  unit_id: number;

  @ApiProperty({ example: 'sampleType1' })
  @IsString()
  sample_type_id: string;

  @ApiProperty({ example: 'specTypeA' })
  @IsString()
  spec_type_id: string;

  @ApiProperty({ example: '6.5-8.5' })
  @IsString()
  @Length(1, 100)
  spec: string;

  @ApiProperty({ example: 8.0 })
  @IsDecimal()
  warning_max: number;

  @ApiProperty({ example: '7.2' })
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
  is_enter_decimal: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ required: false, example: new Date() })
  @IsOptional()
  @IsString()
  created_on?: string;

  @ApiProperty({ required: false, example: 1 })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiProperty({ required: false, example: new Date() })
  @IsOptional()
  @IsString()
  updated_on?: string;

  @ApiProperty({ required: false, example: 2 })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}
