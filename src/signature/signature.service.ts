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
              lead_name: { contains: keyword, mode: 'insensitive' },
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