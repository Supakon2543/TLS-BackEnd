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
      spec_min:
        typeof item.spec_min === 'string'
          ? parseFloat(item.spec_min)
          : item.spec_min,
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
