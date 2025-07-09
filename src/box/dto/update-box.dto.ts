import { PartialType } from '@nestjs/mapped-types';
import { CreateBoxDto } from './create-box.dto';

import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateBoxDto {
  @ApiProperty({ example: 0 , description: 'User 0 for create', type: 'number' }) 
  @IsInt()
  id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  location_id: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  section_id: number;

  @ApiProperty({ example: "Box A1" })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: 24 })
  @IsInt()
  number_of_bottle: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ example: new Date() })
  @IsOptional()
  @IsString()
  created_on?: string;

  @ApiProperty({ example: 1001 })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiProperty({ example: new Date() })
  @IsOptional()
  @IsString()
  updated_on?: string;

  @ApiProperty({ example: 1002 })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}