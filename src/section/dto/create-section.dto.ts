import {
    IsInt,
    IsString,
    IsBoolean,
    IsOptional,
    Length,
  } from 'class-validator';
  
  export class CreateSectionDto {
    @IsInt()
    location_id: number;
  
    @IsString()
    @Length(1, 50)
    name: string;
  
    @IsInt()
    number_of_box: number;
  
    @IsBoolean()
    status: boolean;
  
    @IsOptional()
    @IsInt()
    created_by?: number;

    @IsOptional()
    @IsInt()
    updated_by?: number;
  }
  