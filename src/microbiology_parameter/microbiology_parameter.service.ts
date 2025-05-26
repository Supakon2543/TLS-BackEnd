import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Adjust path if needed
import { CreateMicrobiologyParameterDto } from './dto/create-microbiology_parameter.dto';
import { UpdateMicrobiologyParameterDto } from './dto/update-microbiology_parameter.dto';

@Injectable()
export class MicrobiologyParameterService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateMicrobiologyParameterDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.microbiology_parameter.create({ data: createData }); // Create a new record
    }
    return this.prisma.microbiology_parameter.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // Create new record
  async create(dto: CreateMicrobiologyParameterDto) {
    return this.prisma.microbiology_parameter.create({
      data: dto,
    });
  }

  // Get all records
  async findAll() {
    return this.prisma.microbiology_parameter.findMany({
      orderBy: { order: 'asc' },
    });
  }

  // Get records with filters
  // ...existing code...

  async getMicrobiologyParameters(params: {
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
        return this.prisma.microbiology_parameter.findMany({
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

    const results = await this.prisma.microbiology_parameter.findMany({
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

    // Ensure spec_min is always a number in the output
    return results.map(item => ({
      ...item,
      request_min: item.request_min !== null && item.request_min !== undefined ? Number(item.request_min) : null,
      spec_min: item.spec_min !== null && item.spec_min !== undefined ? Number(item.spec_min) : null,
      spec_max: item.spec_max !== null && item.spec_max !== undefined ? Number(item.spec_max) : null,
      warning_max: item.warning_max !== null && item.warning_max !== undefined ? Number(item.warning_max) : null,
      warning_min: item.warning_min !== null && item.warning_min !== undefined ? Number(item.warning_min) : null,
    }));
  }

// ...existing code...

  // Get one record by ID
  async findOne(id: number) {
    const item = await this.prisma.microbiology_parameter.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Chemical Parameter with ID ${id} not found`);
    }

    return item;
  }

  // Update a record
  async update(id: number, dto: UpdateMicrobiologyParameterDto) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.microbiology_parameter.update({
      where: { id },
      data: dto,
    });
  }

  // Delete a record
  async remove(id: number) {
    await this.findOne(id); // Ensure it exists

    return this.prisma.microbiology_parameter.delete({
      where: { id },
    });
  }
}