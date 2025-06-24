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
import { CreateMicrobiologySampleDescriptionDto } from 'src/microbiology_sample_description/dto/create-microbiology_sample_description.dto';


export class CreateMicrobiologyParameterDto {
  @IsInt()
  id: number;

  @IsInt()
  order: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  name_abb: string;

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
  is_enter_decimal: boolean;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsString()
  created_on?: string;

  @IsOptional()
  @IsString()
  updated_on?: string;

  @IsOptional()
  @IsInt()
  updated_by?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMicrobiologySampleDescriptionDto)
  microbiology_sample_description?: CreateMicrobiologySampleDescriptionDto[];
}
