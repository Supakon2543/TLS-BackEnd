import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsNumberString,
  Length,
  IsNumber,
} from 'class-validator';

export class CreateMicrobiologyParameterDto {
  @IsInt()
  id: number;

  @IsInt()
  order: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsNumber()
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

  @IsOptional()
  @IsNumber()
  spec_min?: number;

  @IsOptional()
  @IsNumber()
  spec_max?: number;

  @IsOptional()
  @IsNumber()
  warning_min?: number;

  @IsOptional()
  @IsNumber()
  warning_max?: number;

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
