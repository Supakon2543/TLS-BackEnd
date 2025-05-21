import { IsString, IsBoolean, IsInt, IsOptional, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLineDto {

  @ApiProperty({ example: 1, description: 'Unique identifier for the line' })
  @IsInt()
  id: number;
  
  @ApiProperty({ example: 'LN001', description: 'Code of the line (1-10 characters)' })
  @IsString()
  @Length(1, 10)
  code: string;

  @ApiProperty({ example: 'Main Production Line', description: 'Name of the line (1-50 characters)' })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: true, description: 'Status of the line' })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ example: 100, description: 'ID of the user who created the line' })
  @IsOptional()
  @IsInt()
  created_by?: number;
}
