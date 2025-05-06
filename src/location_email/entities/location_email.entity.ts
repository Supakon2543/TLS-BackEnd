import {
    IsBoolean,
    IsEmail,
    IsInt,
    IsOptional,
    IsString,
    Length,
    MaxLength,
  } from 'class-validator';
  
  export class LocationEmailDto {
    @IsString()
    id: string;
  
    @IsInt()
    user_location_id: number;
  
    @IsOptional()
    @IsEmail({}, { message: 'Must be a valid email address' })
    @MaxLength(500)
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
  