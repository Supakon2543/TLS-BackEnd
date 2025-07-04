import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMaterialMicrobiologyDto } from './dto/create-material_microbiology.dto';
import { UpdateMaterialMicrobiologyDto } from './dto/update-material_microbiology.dto';

@Injectable()
export class MaterialMicrobiologyService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateMaterialMicrobiologyDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data; // Destructure to exclude id
      return this.prisma.material_microbiology.create({ data: createData }); // Create a new record
    }
    return this.prisma.material_microbiology.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // Get records with filters
  async getMaterialMicrobiologies(params: {
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
        return this.prisma.material_microbiology.findMany({
          where: {
            ...(id && { id }),
            ...(typeof status === 'number' && status !== 0
              ? { status: status === 1 }
              : {}),
            ...(keyword && {
              name: { contains: keyword, mode: 'insensitive' },
            }),
          },
          orderBy: { id: 'asc' }, // Sorting by name or any field as needed
        });
      }
      return [];
    }

    return this.prisma.material_microbiology.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { id: 'asc' }, // Sorting by name or any field as needed
    });
  }

  // Create one record
  async create(data: CreateMaterialMicrobiologyDto) {
    return this.prisma.material_microbiology.create({ data });
  }

  // Get all records
  async findAll() {
    return this.prisma.material_microbiology.findMany();
  }

  // Get a single record by ID
  async findOne(id: number) {
    const record = await this.prisma.material_microbiology.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(
        `MaterialMicrobiology with ID ${id} not found`,
      );
    }
    return record;
  }

  // Update a record
  async update(id: number, data: UpdateMaterialMicrobiologyDto) {
    await this.findOne(id); // Ensure record exists
    return this.prisma.material_microbiology.update({
      where: { id },
      data,
    });
  }

  // Delete a record
  async remove(id: number) {
    await this.findOne(id); // Ensure record exists
    return this.prisma.material_microbiology.delete({ where: { id } });
  }
}
