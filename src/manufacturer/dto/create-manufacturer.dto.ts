import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Length,
} from 'class-validator';

export class CreateManufacturerDto {
  @ApiProperty({ type: Number })
  @IsInt()
  id: number;

  @ApiProperty({ type: String, minLength: 1, maxLength: 100 })
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  is_chemical_stock: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  is_equipment_stock: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  created_on?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  updated_on?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}
