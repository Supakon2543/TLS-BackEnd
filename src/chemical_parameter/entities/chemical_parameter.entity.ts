import {
    IsBoolean,
    IsDate,
    IsDecimal,
    IsInt,
    IsOptional,
    IsString,
    Length,
  } from 'class-validator';
  import { Transform } from 'class-transformer';
import { Decimal } from 'generated/prisma/runtime/library';
  
  export class ChemicalParameterEntity {
    @IsOptional()
    @IsInt()
    id?: number;
  
    @IsInt()
    order: number;
  
    @IsString()
    @Length(1, 50)
    name: string;

    @IsString()
    @Length(1, 50)
    name_abb: string;
  
    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
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
    created_on?: Date;
  
    @IsOptional()
    @IsInt()
    created_by?: number;
  
    @IsOptional()
    @IsDate()
    updated_on?: Date;
  
    @IsOptional()
    @IsInt()
    updated_by?: number;
  }
  