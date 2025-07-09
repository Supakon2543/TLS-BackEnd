import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateChemicalDto {
  @ApiPropertyOptional({ type: Number, description: 'Chemical ID (optional)' })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty({ type: String, description: 'Chemical code' })
  @IsString()
  code: string;

  @ApiProperty({ type: String, description: 'Chemical name' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'Manufacturer ID' })
  @IsInt()
  manufacturer_id: number;

  @ApiProperty({ type: String, description: 'Category chemical ID' })
  @IsString()
  category_chemical_id: string;

  @ApiProperty({ type: String, description: 'Storage condition' })
  @IsString()
  storage_condition: string;

  @ApiProperty({ type: Number, description: 'Minimum stock' })
  @IsInt()
  min_stock: number;

  @ApiProperty({ type: Number, description: 'Unit ID' })
  @IsInt()
  unit_id: number;

  @ApiPropertyOptional({ type: String, description: 'Email for notification (optional)' })
  @IsOptional()
  @IsString()
  email_notification?: string;

  @ApiPropertyOptional({ type: Boolean, description: 'Status (optional)' })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({ type: Number, description: 'Created by user ID (optional)' })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ type: Date, description: 'Created on date (optional)' })
  @IsOptional()
  @IsString()
  created_on?: string;

  @ApiPropertyOptional({ type: Date, description: 'Updated on date (optional)' })
  @IsOptional()
  @IsString()
  updated_on?: string;

  @ApiPropertyOptional({ type: Number, description: 'Updated by user ID (optional)' })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}
