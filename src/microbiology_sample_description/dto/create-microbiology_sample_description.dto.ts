import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateMicrobiologySampleDescriptionDto {
  @ApiProperty({ example: 1, required: false })
  @IsInt()
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 'desc123' })
  @IsString()
  sample_description_id: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  microbiology_parameter_id: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lod_value?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  loq_value?: string;

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