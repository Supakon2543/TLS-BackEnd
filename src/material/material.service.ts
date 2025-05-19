import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path based on your folder structure
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a material
  async createOrUpdate(data: CreateMaterialDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data; // Destructure to exclude id
      return this.prisma.material.create({ data: createData }); // Create a new record
    }
    return this.prisma.material.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // Create a new material
  async create(createDto: CreateMaterialDto) {
    return this.prisma.material.create({
      data: createDto,
    });
  }

  // Get materials with filters
  async getMaterials(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    return this.prisma.material.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { name: 'asc' }, // Sorting by name or any field as needed
    });
  }

  // Get all materials
  async findAll() {
    return this.prisma.material.findMany({
      orderBy: { name: 'asc' }, // Sorting by name or any field as needed
    });
  }

  // Get a material by ID
  async findOne(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }

    return material;
  }

  // Update a material by ID
  async update(id: number, updateDto: UpdateMaterialDto) {
    await this.findOne(id); // Ensure the material exists before updating

    return this.prisma.material.update({
      where: { id },
      data: updateDto,
    });
  }

  // Delete a material by ID
  async remove(id: number) {
    await this.findOne(id); // Ensure the material exists before deletion

    return this.prisma.material.delete({
      where: { id },
    });
  }
}
