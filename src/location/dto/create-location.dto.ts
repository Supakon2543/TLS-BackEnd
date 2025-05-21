import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Length,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the location' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 'Main Office', description: 'Name of the location' })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: true, description: 'Status of the location' })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ example: 10, description: 'ID of the user who created the location' })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ example: 12, description: 'ID of the user who last updated the location' })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}
