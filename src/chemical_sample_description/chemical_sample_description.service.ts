import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // adjust path as needed
import { CreateChemicalSampleDescriptionDto } from './dto/create-chemical_sample_description.dto';
import { UpdateChemicalSampleDescriptionDto } from './dto/update-chemical_sample_description.dto';

@Injectable()
export class ChemicalSampleDescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateChemicalSampleDescriptionDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.chemical_sample_description.create({ data: createData });
    }
    return this.prisma.chemical_sample_description.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  // async create(createChemicalSampleDescriptionDto: CreateChemicalSampleDescriptionDto) {
  //   return this.prisma.chemical_sample_description.create({
  //     data: createChemicalSampleDescriptionDto,
  //   });
  // }

  async getChemicalSampleDescriptions(params: {
    id?: number;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        return this.prisma.chemical_sample_description.findMany({
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

    return this.prisma.chemical_sample_description.findMany({
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
    return this.prisma.chemical_sample_description.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const record = await this.prisma.chemical_sample_description.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`ChemicalSampleDescription with ID ${id} not found`);
    }

    return record;
  }

  async update(id: number, updateChemicalSampleDescriptionDto: UpdateChemicalSampleDescriptionDto) {
    await this.findOne(id);

    return this.prisma.chemical_sample_description.update({
      where: { id },
      data: updateChemicalSampleDescriptionDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.chemical_sample_description.delete({
      where: { id },
    });
  }
}