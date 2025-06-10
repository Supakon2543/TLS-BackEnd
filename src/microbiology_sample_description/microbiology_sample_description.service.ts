import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateMicrobiologySampleDescriptionDto } from './dto/create-microbiology_sample_description.dto';
import { UpdateMicrobiologySampleDescriptionDto } from './dto/update-microbiology_sample_description.dto';

@Injectable()
export class MicrobiologySampleDescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateMicrobiologySampleDescriptionDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.microbiology_sample_description.create({ data: createData });
    }
    return this.prisma.microbiology_sample_description.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  async create(createMicrobiologySampleDescriptionDto: CreateMicrobiologySampleDescriptionDto) {
    return this.prisma.microbiology_sample_description.create({
      data: createMicrobiologySampleDescriptionDto,
    });
  }

  async getMicrobiologySampleDescriptions(params: {
    id?: number;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        return this.prisma.microbiology_sample_description.findMany({
          where: {
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              sample_description_id: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { id: 'asc' },
        });
      }
      return [];
    }

    return this.prisma.microbiology_sample_description.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          sample_description_id: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { id: 'asc' },
    });
  }

  async findAll() {
    return this.prisma.microbiology_sample_description.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.microbiology_sample_description.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`MicrobiologySampleDescription with ID ${id} not found`);
    }

    return record;
  }

  async update(id: number, updateMicrobiologySampleDescriptionDto: UpdateMicrobiologySampleDescriptionDto) {
    await this.findOne(id);

    return this.prisma.microbiology_sample_description.update({
      where: { id },
      data: updateMicrobiologySampleDescriptionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.microbiology_sample_description.delete({
      where: { id },
    });
  }
}