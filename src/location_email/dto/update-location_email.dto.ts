import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  Length,
} from 'class-validator';

export class UpdateLocationEmailDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ example: "AH" })
  @IsString()
  user_location_id: string;

  @ApiPropertyOptional({ maxLength: 500, example: 'user@example.com' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  email_notification?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  updated_by?: number;

  @ApiProperty({ example: 5 })
  location_id: any;

  @ApiProperty({ example: 7 })
  email_id: any;
}
