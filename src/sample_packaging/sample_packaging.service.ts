import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateSamplePackagingDto } from './dto/create-sample_packaging.dto';
import { UpdateSamplePackagingDto } from './dto/update-sample_packaging.dto';

@Injectable()
export class SamplePackagingService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateSamplePackagingDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data; // Exclude id
      return this.prisma.sample_packaging.create({ data: createData });
    }
    return this.prisma.sample_packaging.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  async create(createSamplePackagingDto: CreateSamplePackagingDto) {
    return this.prisma.sample_packaging.create({
      data: createSamplePackagingDto,
    });
  }

  async getSamplePackagings(params: {
    id?: number;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        return this.prisma.sample_packaging.findMany({
          where: {
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              name: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { order: 'asc' },
        });
      }
      return [];
    }

    return this.prisma.sample_packaging.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { order: 'asc' },
    });
  }

  async findAll() {
    return this.prisma.sample_packaging.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: number) {
    const samplePackaging = await this.prisma.sample_packaging.findUnique({
      where: { id },
    });

    if (!samplePackaging) {
      throw new NotFoundException(`SamplePackaging with ID ${id} not found`);
    }

    return samplePackaging;
  }

  async update(id: number, updateSamplePackagingDto: UpdateSamplePackagingDto) {
    await this.findOne(id); // ensure it exists

    return this.prisma.sample_packaging.update({
      where: { id },
      data: updateSamplePackagingDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ensure it exists

    return this.prisma.sample_packaging.delete({
      where: { id },
    });
  }
}