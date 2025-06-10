import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';

export class CustomerContactInfo {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({ maxLength: 100 })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  status?: boolean;

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