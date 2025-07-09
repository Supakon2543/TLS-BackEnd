import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateChemicalSampleDescriptionDto } from 'src/chemical_sample_description/dto/create-chemical_sample_description.dto';

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

  @IsString()
  @Length(1, 50)
  name_abb: string;

  @ApiPropertyOptional({ example: 0.5 })
  @IsOptional()
  @IsNumber()
  request_min?: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsInt()
  unit_id: number;

  @ApiProperty({ example: 'sampleType123' })
  @IsOptional()
  @IsString()
  sample_type_id: string;

  @ApiProperty({ example: 'specType456' })
  @IsOptional()
  @IsString()
  spec_type_id: string;

  @ApiProperty({ maxLength: 100, example: 'Spec description' })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  spec: string;

  @ApiProperty({ example: 6.5 })
  @IsOptional()
  @IsNumber()
  spec_min: number;

  @ApiProperty({ example: 7.5 })
  @IsOptional()
  @IsNumber()
  spec_max: number;

  @ApiProperty({ example: 6.0 })
  @IsOptional()
  @IsNumber()
  warning_min: number;

  @ApiProperty({ example: 8.0 })
  @IsOptional()
  @IsNumber()
  warning_max: number;

  @ApiProperty({ example: 'finalResultValue' })
  @IsOptional()
  @IsString()
  final_result: string;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsInt()
  decimal: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_enter_spec_min: boolean;


  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  is_enter_spec_max: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_enter_warning_min: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  is_enter_warning_max: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  is_enter_decimal: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ example: new Date() })
  @IsOptional()
  @IsString()
  created_on?: string;

  @ApiPropertyOptional({ example: 1001 })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ example: new Date() })
  @IsOptional()
  @IsString()
  updated_on?: string;

  @ApiPropertyOptional({ example: 1002 })
  @IsOptional()
  @IsInt()
  updated_by?: number;

  @ApiProperty({ type: [CreateChemicalSampleDescriptionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChemicalSampleDescriptionDto)
  chemical_sample_description?: CreateChemicalSampleDescriptionDto[];
}
