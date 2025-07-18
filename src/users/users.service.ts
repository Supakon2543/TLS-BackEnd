import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(/*p0: { id: number; employee_id: string | null; username: string; fullname: string; tel: string | null; email: string; company: string | null; dept_code: string | null; dept_name: string | null; user_location_id: string | null; position_name: string | null; } | CreateUserDto, p1: { employee_id: any; username: any; fullname: any; tel: any; email: any; company: any; dept_code: any; dept_name: any; user_location_id: string; position_name: any; },*/ data: CreateUserDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data; // Destructure to exclude id
      return this.prisma.user.create({ data: createData }); // Create a new record
    }
    return this.prisma.user.upsert({
      where: { id: data.id }, // Use id for the unique constraint
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // get users with filters
  async getUsers(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        return this.prisma.user.findMany({
          where: {
            ...(id && { id }),
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              name: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { employee_id: 'asc' },
        });
      }
      return [];
    }

    return this.prisma.user.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { employee_id: 'asc' },
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
