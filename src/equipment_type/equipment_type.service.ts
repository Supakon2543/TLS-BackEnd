import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEquipmentTypeDto } from './dto/create-equipment_type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment_type.dto';

@Injectable()
export class EquipmentTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateEquipmentTypeDto) {
     if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.equipment_type.create({ data: createData });
    }
    return this.prisma.equipment_type.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async getEquipmentTypes(params: {
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
        return this.prisma.equipment_type.findMany({
          where: {
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
      return [];
    }

    return this.prisma.equipment_type.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { name: 'asc' },
    });
  }

  async create(data: CreateEquipmentTypeDto) {
    return this.prisma.equipment_type.create({ data });
  }

  async findAll() {
    return this.prisma.equipment_type.findMany();
  }

  async findOne(id: number) {
    const equipmentType = await this.prisma.equipment_type.findUnique({
      where: { id },
    });
    if (!equipmentType)
      throw new NotFoundException(`Equipment Type ID ${id} not found`);
    return equipmentType;
  }

  async update(id: number, data: UpdateEquipmentTypeDto) {
    await this.findOne(id);
    return this.prisma.equipment_type.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.equipment_type.delete({ where: { id } });
  }
}
