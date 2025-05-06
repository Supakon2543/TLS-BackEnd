import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    return this.prisma.user_role.create({
      data: createUserRoleDto,
    });
  }

  async findAll() {
    return this.prisma.user_role.findMany();
  }

  async findOne(userId: number) {
    return this.prisma.user_role.findUnique({
      where: { user_id: userId }, // Use user_id instead of userId
    });
  }
  
  async update(userId: number, updateUserRoleDto: UpdateUserRoleDto) {
    return this.prisma.user_role.update({
      where: { user_id: userId }, // Use user_id here as well
      data: updateUserRoleDto,
    });
  }
  
  async remove(userId: number) {
    return this.prisma.user_role.delete({
      where: { user_id: userId }, // Again, use user_id here
    });
  }
}