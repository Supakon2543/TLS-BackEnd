import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEquipmentTypeDto } from './dto/create-equipment_type.dto';
import { UpdateEquipmentTypeDto } from './dto/update-equipment_type.dto';

@Injectable()
export class EquipmentTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateEquipmentTypeDto) {
    return this.prisma.equipment_type.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
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
