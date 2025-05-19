import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateUserDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      return this.prisma.user.create({ data });
    }
    return this.prisma.user.upsert({
      where: { id: data.id }, // Use id for the unique constraint
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(CreateUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: CreateUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId }, // Use user_id instead of userId
    });
  }
  
  async update(userId: number, updateUserRoleDto: CreateUserDto) {
    return this.prisma.user.update({
      where: { id: userId }, // Use user_id here as well
      data: updateUserRoleDto,
    });
  }
  
  async remove(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId }, // Again, use user_id here
    });
  }
}
