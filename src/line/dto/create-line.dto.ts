import { IsString, IsBoolean, IsInt, IsOptional, Length } from 'class-validator';

export class CreateLineDto {

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
  @IsInt()
  created_by?: number;
}
