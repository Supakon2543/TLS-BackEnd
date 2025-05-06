import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ModelUserRole {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  roleId: string;

  @CreateDateColumn()
  createdOn: Date;
}