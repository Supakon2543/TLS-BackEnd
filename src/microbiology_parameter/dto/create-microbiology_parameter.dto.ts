import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsNumberString,
  Length,
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
  @IsNumberString()
  request_min?: string;

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
  @IsNumberString()
  spec_min?: string;

  @IsOptional()
  @IsNumberString()
  spec_max?: string;

  @IsOptional()
  @IsNumberString()
  warning_min?: string;

  @IsOptional()
  @IsNumberString()
  warning_max?: string;

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
