// src/chemical/dto/create-chemical.dto.ts
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateChemicalDto {
  @IsString()
  
  code: string;

  @IsString()
  name: string;

  @IsInt()
  manufacturer_id: number;

  @IsString()
  category_chemical_id: string;

  @IsString()
  storage_condition: string;

  @IsInt()
  min_stock: number;

  @IsInt()
  unit_id: number;

  @IsOptional()
  @IsEmail()
  email_notification?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
