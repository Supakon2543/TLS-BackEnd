import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class Signature {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  lead_name: string;

  @ApiProperty({ maxLength: 500, required: false })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  path?: string;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  @IsOptional()
  created_on?: Date;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  created_by?: number;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  @IsOptional()
  updated_on?: Date;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  updated_by?: number;
}