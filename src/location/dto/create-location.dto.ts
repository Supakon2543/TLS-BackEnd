import {
  IsString,
  IsBoolean,
  IsOptional,
  IsInt,
  Length,
} from 'class-validator';

export class CreateLocationDto {
  @IsInt()
  id: number;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
