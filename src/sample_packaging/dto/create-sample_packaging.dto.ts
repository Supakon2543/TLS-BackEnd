import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSamplePackagingDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  order: number;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsBoolean()
  text_input: boolean;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by: number;

  @IsOptional()
  @IsString()
  created_on: string;
  
  @IsOptional()
  @IsString()
  updated_on: string;

  @IsOptional()
  @IsInt()
  updated_by: number;
}
