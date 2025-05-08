import {
    IsInt,
    IsOptional,
    IsString,
    IsBoolean,
    Length,
  } from 'class-validator';
  
  export class Unit {
    @IsInt()
    id: number;
  
    @IsInt()
    order: number;
  
    @IsString()
    @Length(1, 50)
    name: string;
  
    @IsBoolean()
    is_sample: boolean;
  
    @IsBoolean()
    is_chemical: boolean;
  
    @IsBoolean()
    is_microbiology: boolean;
  
    @IsBoolean()
    is_chemical_stock: boolean;
  
    @IsBoolean()
    status: boolean;
  
    @IsOptional()
    created_on?: Date;
  
    @IsOptional()
    @IsInt()
    created_by?: number;
  
    @IsOptional()
    updated_on?: Date;
  
    @IsOptional()
    @IsInt()
    updated_by?: number;
  }
  