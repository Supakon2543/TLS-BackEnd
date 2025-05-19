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
      return this.prisma.material_microbiology.create({ data });
    }
    return this.prisma.material_microbiology.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
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
    const record = await this.prisma.material_microbiology.findUnique({ where: { id } });
    if (!record) {
      throw new NotFoundException(`MaterialMicrobiology with ID ${id} not found`);
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
