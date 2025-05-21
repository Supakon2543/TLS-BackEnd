import { IsBoolean, IsInt, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLabProcessDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the lab process' })
  @IsInt()
  id: number;

  @ApiProperty({ example: 10, description: 'Order of the lab process' })
  @IsInt()
  order: number;

  @ApiProperty({ example: 'Sample Process', description: 'Name of the lab process', maxLength: 50 })
  @IsString()
  @Length(1, 50)
  name: string;

  @ApiProperty({ example: true, description: 'Indicates if text input is required' })
  @IsBoolean()
  text_input: boolean;

  @ApiProperty({ example: true, description: 'Status of the lab process' })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ example: 1001, description: 'ID of the user who created the process' })
  @IsInt()
  created_by: number;

  @ApiProperty({ example: 1002, description: 'ID of the user who last updated the process' })
  @IsInt()
  updated_by: number;
}
