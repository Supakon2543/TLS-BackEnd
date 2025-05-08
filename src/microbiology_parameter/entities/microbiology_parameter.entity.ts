import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumberString,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MicrobiologyParameter {
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
  @IsDate()
  @Type(() => Date)
  created_on?: Date;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_on?: Date;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
