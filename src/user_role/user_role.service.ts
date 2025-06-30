import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user_role.dto';
import { UpdateUserRoleDto } from './dto/update-user_role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateUserRoleDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data; // Destructure to exclude id
      return this.prisma.user_role.create({ data: createData }); // Create a new record
    }
    return this.prisma.user_role.upsert({
      where: { id: data.id }, // Use user_id for the unique constraint
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // get user roles with filters
  async getuser_role(params: {
    userId?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { userId, keyword, status } = params;

    // Convert userId and status to numbers if they are strings
    userId = userId !== undefined ? +userId : undefined;
    status = status !== undefined ? +status : undefined;

    if (userId == 0 || Number.isNaN(userId) || typeof userId === 'string') {
      if (keyword || status) {
        return this.prisma.user_role.findMany({
          where: {
            ...(userId && { user_id: userId }), // Use user_id for filtering
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              name: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { user_id: 'asc' },
        });
      }
      return [];
    }

    return this.prisma.user_role.findMany({
      where: {
        ...(userId && { user_id: userId }), // Use user_id for filtering
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { user_id: 'asc' },
    });
  }

  async create(createUserRoleDto: CreateUserRoleDto) {
    return this.prisma.user_role.create({
      data: createUserRoleDto,
    });
  }

  async findAll() {
    return this.prisma.user_role.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user_role.findUnique({
      where: { id: id }, // Use user_id instead of userId
    });
  }

  async update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return this.prisma.user_role.update({
      where: { id: id }, // Use user_id here as well
      data: updateUserRoleDto,
    });
  }

  async remove(id: number) {
    return this.prisma.user_role.delete({
      where: { id: id }, // Again, use user_id here
    });
  }
}
