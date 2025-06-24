import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import {
    IsBoolean,
    IsDate,
    IsInt,
    IsOptional,
    IsString,
    Length,
  } from 'class-validator';
  
  @Entity() 
  export class Objective {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsInt()
    order: number;
  
    @Column({ length: 50 })
    @IsString()
    @Length(1, 50)
    name: string;
  
    @Column()
    @IsBoolean()
    text_input: boolean;
  
    @Column()
    @IsBoolean()
    status: boolean;
  
    @CreateDateColumn({ type: 'timestamp', nullable: true })
    @IsOptional()
    @IsDate()
    created_on?: Date;
  
    @Column()
    @IsInt()
    created_by: number;
  
    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    @IsOptional()
    @IsDate()
    updated_on?: Date;
  
    @Column()
    @IsInt()
    updated_by: number;
  }
  