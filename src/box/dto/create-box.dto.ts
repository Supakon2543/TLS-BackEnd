import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateBoxDto {
  @IsInt()
  id: number;

  @IsInt()
  location_id: number;

  @IsInt()
  section_id: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsInt()
  number_of_bottle: number;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
