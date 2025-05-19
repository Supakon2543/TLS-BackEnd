import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMaterialChemicalDto } from './dto/create-material_chemical.dto';
import { UpdateMaterialChemicalDto } from './dto/update-material_chemical.dto';

@Injectable()
export class MaterialChemicalService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a record
  async createOrUpdate(data: CreateMaterialChemicalDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      return this.prisma.material_chemical.create({ data });
    }
    return this.prisma.material_chemical.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  // Create a new record
  async create(data: CreateMaterialChemicalDto) {
    return this.prisma.material_chemical.create({
      data,
    });
  }

  // Get all records
  async findAll() {
    return this.prisma.material_chemical.findMany();
  }

  // Get a single record by ID
  async findOne(id: number) {
    const record = await this.prisma.material_chemical.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException(`MaterialChemical with ID ${id} not found`);
    }
    return record;
  }

  // Update a record by ID
  async update(id: number, data: UpdateMaterialChemicalDto) {
    await this.findOne(id); // Ensure the record exists
    return this.prisma.material_chemical.update({
      where: { id },
      data,
    });
  }

  // Delete a record by ID
  async remove(id: number) {
    await this.findOne(id); // Ensure the record exists
    return this.prisma.material_chemical.delete({
      where: { id },
    });
  }
}
