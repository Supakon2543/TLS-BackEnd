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
  
    @IsOptional()
    @Transform(({ value }) => parseFloat(value))
    @IsDecimal()
    request_min?: Decimal;
  
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
    spec_min: Decimal;
  
    @IsDecimal()
    spec_max: Decimal;
  
    @IsDecimal()
    warning_min: Decimal;
  
    @IsDecimal()
    warning_max: Decimal;
  
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
  