import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateSignatureDto } from './dto/create-signature.dto';
import { UpdateSignatureDto } from './dto/update-signature.dto';

@Injectable()
export class SignatureService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateSignatureDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.signature.create({ data: createData });
    }
    return this.prisma.signature.upsert({
      where: { id: data.id },
      create: {
        ...data,
        created_on:
          data.created_on && data.created_on !== ''
            ? new Date(data.created_on)
            : new Date(),
        updated_on:
          data.updated_on && data.updated_on !== ''
            ? new Date(data.updated_on)
            : new Date(),
      },
      update: {
        ...data,
        created_on:
          data.created_on && data.created_on !== ''
            ? new Date(data.created_on)
            : new Date(),
        updated_on:
          data.updated_on && data.updated_on !== ''
            ? new Date(data.updated_on)
            : new Date(),
      },
    });
  }

  async create(createSignatureDto: CreateSignatureDto) {
    return this.prisma.signature.create({
      data: createSignatureDto,
    });
  }

  async getSignatures(params: {
    id?: number;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        return this.prisma.signature.findMany({
          where: {
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              filename: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { id: 'asc' },
        });
      }
      return [];
    }

    return this.prisma.signature.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          lead_name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { id: 'asc' },
    });
  }

  async getSignatureMap(params: {
    id?: number | string;
    keyword?: string;
    role_id?: string;
  }) {
    let { id, keyword, role_id } = params;

    // Convert id to number if it's a string
    id = id !== undefined ? +id : undefined;

    // Build user filter
    const userWhere: any = {};
    if (id) userWhere.id = id;
    if (role_id) {
      userWhere.user_role = { some: { role_id } };
    }
    if (keyword) {
      userWhere.OR = [
        { fullname: { contains: keyword, mode: 'insensitive' } },
        { username: { contains: keyword, mode: 'insensitive' } },
        { email: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    // Get all users with their signatures (if any)
    const users = await this.prisma.user.findMany({
      where: userWhere,
      include: {
        signature: {
          orderBy: { id: 'asc' },
        },
        user_role: true,
      },
      orderBy: { id: 'asc' },
    });

    type UserSignatureMap = {
      user: {
        id: number;
        employee_id: string | null;
        username: string;
        fullname: string;
        tel: string | null;
        email: string;
        company: string | null;
        dept_code: string | null;
        dept_name: string | null;
        user_location_id: string | null;
        supervisor_id: number | null;
        position_name: string | null;
      };
      signature: {
        id: number | null;
        user_id: number | null;
        filename: string | null;
        path: string | null;
        created_on: Date | null;
        created_by: number | null;
        updated_on: Date | null;
        updated_by: number | null;
      } | null;
    };

    // Map to desired format: one record per user-signature pair, or user with signature: null
    const result: UserSignatureMap[] = users
      .map((user) => {
        if (user.signature.length === 0) {
          return [
            {
              user: {
                id: user.id,
                employee_id: user.employee_id,
                username: user.username,
                fullname: user.fullname,
                tel: user.tel,
                email: user.email,
                company: user.company,
                dept_code: user.dept_code,
                dept_name: user.dept_name,
                user_location_id: user.user_location_id,
                supervisor_id: user.supervisor_id,
                position_name: user.position_name,
              },
              signature: {
                id: null,
                user_id: null,
                filename: null,
                path: null,
                created_on: null,
                created_by: null,
                updated_on: null,
                updated_by: null,
              },
            },
          ];
        }
        return user.signature.map((sig) => ({
          user: {
            id: user.id,
            employee_id: user.employee_id,
            username: user.username,
            fullname: user.fullname,
            tel: user.tel,
            email: user.email,
            company: user.company,
            dept_code: user.dept_code,
            dept_name: user.dept_name,
            user_location_id: user.user_location_id,
            supervisor_id: user.supervisor_id,
            position_name: user.position_name,
          },
          signature: sig,
        }));
      })
      .flat();

    return result;
  }

  async findAll() {
    return this.prisma.signature.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const signature = await this.prisma.signature.findUnique({
      where: { id },
    });

    if (!signature) {
      throw new NotFoundException(`Signature with ID ${id} not found`);
    }

    return signature;
  }

  async update(id: number, updateSignatureDto: UpdateSignatureDto) {
    await this.findOne(id);

    return this.prisma.signature.update({
      where: { id },
      data: updateSignatureDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.signature.delete({
      where: { id },
    });
  }
}
