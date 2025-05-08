import { IsString, IsBoolean, IsOptional, IsInt, Length } from 'class-validator';

export class Line {
  @IsInt()
  id: number;

  @IsString()
  @Length(1, 10)
  code: string;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsBoolean()
  status: boolean;

  @IsOptional()
  created_on?: Date;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  updated_on?: Date;

  @IsOptional()
  @IsInt()
  updated_by?: number;
}
