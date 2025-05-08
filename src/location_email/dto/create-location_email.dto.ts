import {
    IsString,
    IsInt,
    IsOptional,
    IsBoolean,
    Length,
  } from 'class-validator';
  
  export class CreateLocationEmailDto {
    @IsString()
    @Length(1, 15)
    id: string;
  
    @IsInt()
    user_location_id: number;
  
    @IsOptional()
    @IsString()
    @Length(0, 500)
    email_notification?: string;
  
    @IsBoolean()
    status: boolean;
  
    @IsOptional()
    @IsInt()
    created_by?: number;
  
    @IsOptional()
    @IsInt()
    updated_by?: number;
  }
  