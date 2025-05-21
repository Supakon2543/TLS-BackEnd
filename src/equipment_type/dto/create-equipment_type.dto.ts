import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  IsBoolean,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateEquipmentTypeDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the equipment type' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 1, description: 'Order of the equipment type' })
  @IsInt()
  order: number;

  @ApiProperty({ example: 'Excavator', description: 'Name of the equipment type', maxLength: 50 })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: true, description: 'Status of the equipment type' })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ example: 1, description: 'ID of the user who created the equipment type' })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ example: 2, description: 'ID of the user who last updated the equipment type' })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}
