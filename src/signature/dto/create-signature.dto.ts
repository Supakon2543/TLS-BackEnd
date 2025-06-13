import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateSignatureDto {


  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 'signature.png' })
  @IsString()
  filename: string;

  @ApiProperty({ example: '/uploads/signatures/signature.png' })
  @IsString()
  path: string;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  @IsOptional()
  created_on?: Date;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiProperty({ type: String, format: 'date-time', required: false })
  @IsOptional()
  updated_on?: Date;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  updated_by?: number;
}