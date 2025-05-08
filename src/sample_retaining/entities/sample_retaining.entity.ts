import {
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    Length,
  } from 'class-validator';
  
  export class SampleRetainingEntity {
    @IsOptional()
    @IsInt()
    id?: number;
  
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
    @IsDate()
    created_on?: Date;
  
    @IsOptional()
    @IsInt()
    created_by?: number;
  
    @IsOptional()
    @IsDate()
    updated_on?: Date;
  
    @IsOptional()
    @IsInt()
    updated_by?: number;
  }
  