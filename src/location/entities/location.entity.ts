import {
    IsInt,
    IsString,
    IsBoolean,
    IsOptional,
    Length,
  } from 'class-validator';
  
  export class Location {
    @IsInt()
    id: number;
  
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
  