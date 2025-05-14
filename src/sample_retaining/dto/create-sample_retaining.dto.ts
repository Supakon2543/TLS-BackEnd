import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSampleRetainingDto {
  @IsInt()
  id: number;

  @IsInt()
  order: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsBoolean()
  text_input: boolean;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
