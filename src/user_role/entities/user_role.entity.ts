import { IsInt, IsOptional } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class ModelUserRole {
  @IsOptional()
  @IsInt()
  id?: number;

  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  roleId: string;

  @CreateDateColumn()
  createdOn: Date;
}
