import {
  IsInt,
  IsString,
  IsOptional,
  IsBoolean,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryEditDto {
  @ApiProperty({ example: 0, description: 'User 0 for create', type: 'number' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  order: number;
  
  @ApiProperty({ example: 2 })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @ApiProperty({ example: 1001 })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiProperty({ example: new Date() })
  @IsOptional()
  @IsString()
  created_on?: string;

  @ApiProperty({ example: 1002 })
  @IsOptional()
  @IsInt()
  updated_by?: number;

  @ApiProperty({ example: new Date() })
  @IsOptional()
  @IsString()
  updated_on?: string;
}
