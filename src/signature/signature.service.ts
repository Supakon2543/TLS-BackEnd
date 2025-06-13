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
      create: { ...data },
      update: data,
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

    const signatures = await this.prisma.signature.findMany({
      where: {
        ...(id && { user_id: id }),
        ...(keyword && {
          filename: { contains: keyword, mode: 'insensitive' },
        }),
        ...(role_id && {
          user: {
            user_role: {
              some: {
                role_id: role_id,
              },
            },
          },
        }),
      },
      include: {
        user: {
          include: {
            user_role: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    // Flatten the result as requested
    return signatures.map((sig) => ({
      id: sig.id,
      user_id: sig.user_id,
      filename: sig.filename,
      path: sig.path,
      employee_id: sig.user?.employee_id,
      username: sig.user?.username,
      fullname: sig.user?.fullname,
      tel: sig.user?.tel,
      email: sig.user?.email,
      company: sig.user?.company,
      dept_code: sig.user?.dept_code,
      dept_name: sig.user?.dept_name,
      user_location_id: sig.user?.user_location_id,
      supervisor_id: sig.user?.supervisor_id,
      position_name: sig.user?.position_name,
      // Return the first role_id if exists, or null
      role_id: sig.user?.user_role?.[0]?.role_id ?? null,
    }));
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
