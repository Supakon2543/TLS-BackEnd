import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a material
  async createOrUpdate(data: CreateMaterialDto) {
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
    id?: number;
    keyword?: string;
    status?: number;
  }) {
    const { id, keyword, status } = params;

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

  async insert_material(@Body() payload: { id: number, name: string, test_report_name: string, status: boolean }) {
    
    return await this.prisma.$executeRaw`
      CALL insert_material(${payload.id}, ${payload.name}, ${payload.test_report_name}, ${payload.status})
    ;`
  }

  async get_material(@Body() payload: { id: number, keyword: string, status: number }) {
    return await this.prisma.$queryRaw`
      SELECT * FROM get_material(${payload.id})
    ;`
  }
}
