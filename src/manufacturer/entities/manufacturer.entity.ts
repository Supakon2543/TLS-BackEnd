import {
    IsInt,
    IsString,
    IsBoolean,
    IsOptional,
    Length,
  } from 'class-validator';
  
  export class Manufacturer {
    @IsInt()
    id: number;
  
    @IsString()
    @Length(1, 100)
    name: string;
  
    @IsBoolean()
    is_chemical_stock: boolean;
  
    @IsBoolean()
    is_equipment_stock: boolean;
  
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
  