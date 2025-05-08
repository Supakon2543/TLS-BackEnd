import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateManufacturerDto) {
    return this.prisma.manufacturer.create({ data });
  }

  async findAll() {
    return this.prisma.manufacturer.findMany();
  }

  async findOne(id: number) {
    const manufacturer = await this.prisma.manufacturer.findUnique({ where: { id } });
    if (!manufacturer) throw new NotFoundException(`Manufacturer ID ${id} not found`);
    return manufacturer;
  }

  async update(id: number, data: UpdateManufacturerDto) {
    await this.findOne(id);
    return this.prisma.manufacturer.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.manufacturer.delete({ where: { id } });
  }
}
