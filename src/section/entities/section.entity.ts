import {
    IsInt,
    IsString,
    IsBoolean,
    IsOptional,
    Length,
  } from 'class-validator';
  
  export class Section {
    @IsInt()
    id: number;
  
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
  