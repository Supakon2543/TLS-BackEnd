import {
  IsBoolean,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateChemicalParameterDto {

  @IsInt()
  id: number;
  
  @IsInt()
  order: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsDecimal()
  request_min?: number;

  @IsInt()
  unit_id: number;

  @IsString()
  sample_type_id: string;

  @IsString()
  spec_type_id: string;

  @IsString()
  @Length(1, 100)
  spec: string;

  @IsDecimal()
  spec_min: number;

  @IsDecimal()
  spec_max: number;

  @IsDecimal()
  warning_min: number;

  @IsDecimal()
  warning_max: number;

  @IsString()
  final_result: string;

  @IsInt()
  decimal: number;

  @IsBoolean()
  is_enter_spec_min: boolean;

  @IsBoolean()
  is_enter_spec_max: boolean;

  @IsBoolean()
  is_enter_warning_min: boolean;

  @IsBoolean()
  is_enter_warning_max: boolean;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
