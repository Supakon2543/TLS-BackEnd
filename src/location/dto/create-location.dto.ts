import {
    IsString,
    IsBoolean,
    IsOptional,
    IsInt,
    Length,
  } from 'class-validator';
  
  export class CreateLocationDto {
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
  