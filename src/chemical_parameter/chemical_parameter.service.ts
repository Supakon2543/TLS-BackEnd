import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import { CreateChemicalParameterDto } from './dto/create-chemical_parameter.dto';
import { UpdateChemicalParameterDto } from './dto/update-chemical_parameter.dto';

@Injectable()
export class ChemicalParameterService {
  constructor(private readonly prisma: PrismaService) {}
  
  
  async createOrUpdate(data: CreateChemicalParameterDto) {

     if (data.id === null || data.id === undefined || data.id === 0) {
      const { id,created_on,updated_on, ...createData } = data;
      return this.prisma.chemical_parameter.create({ data: createData });
    }
    return this.prisma.chemical_parameter.upsert({
      where: { id: data.id },
      create: { ...data }, 
      update: data, 
    });
  }


  // Create new record
  async create(dto: CreateChemicalParameterDto) {
    return this.prisma.chemical_parameter.create({
      data: dto,
    });
  }

  // Get records with filters
    async getChemicalParameters(params: {
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
        return this.prisma.chemical_parameter.findMany({
          where: {
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              name: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { order: 'asc' }, // Sorting by order or any field as needed
        });
      }
      return [];
    }

    const results = await this.prisma.chemical_parameter.findMany({
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

    // Ensure spec_min is returned as a number (not a string)
    return results.map(item => ({
      ...item,
      request_min: item.request_min !== null && item.request_min !== undefined ? Number(item.request_min) : null,
      spec_min: item.spec_min !== null && item.spec_min !== undefined ? Number(item.spec_min) : null,
      spec_max: item.spec_max !== null && item.spec_max !== undefined ? Number(item.spec_max) : null,
      warning_max: item.warning_max !== null && item.warning_max !== undefined ? Number(item.warning_max) : null,
      warning_min: item.warning_min !== null && item.warning_min !== undefined ? Number(item.warning_min) : null,
    }));
  }

  // Get all records
  async findAll() {
    return this.prisma.chemical_parameter.findMany({
      orderBy: { order: 'asc' },
    });
  }

  // Get one record by ID
  async findOne(id: number) {
    const item = await this.prisma.chemical_parameter.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Chemical Parameter with ID ${id} not found`);
    }

    return item;
  }

  // Update a record
  async update(id: number, dto: UpdateChemicalParameterDto) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.chemical_parameter.update({
      where: { id },
      data: dto,
    });
  }

  // Delete a record
  async remove(id: number) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.chemical_parameter.delete({
      where: { id },
    });
  }
}
