import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateLocationEmailDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  id: number;

  @ApiProperty({ type: Number, example: "AY001" })
  @IsString()
  user_location_id: string;

  @ApiPropertyOptional({ type: String, maxLength: 500, example: 'user@example.com' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  email_notification?: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  status: boolean;

  @ApiPropertyOptional({ type: Number, example: 5 })
  @IsOptional()
  @IsInt()
  created_by?: number;

  @ApiPropertyOptional({ type: Number, example: 6 })
  @IsOptional()
  @IsInt()
  updated_by?: number;

  @ApiProperty({ type: Number, example: 200 })
  location_id: number;

  @ApiProperty({ type: Number, example: 300 })
  email_id: number;
}
