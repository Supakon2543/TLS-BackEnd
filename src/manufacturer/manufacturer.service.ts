import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateManufacturerDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.manufacturer.create({ data: createData }); // Create a new record
    }
    return this.prisma.manufacturer.upsert({
      where: { id: data.id },
      create: { ...data }, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async getManufacturers(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    return this.prisma.manufacturer.findMany({
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

  async create(data: CreateManufacturerDto) {
    return this.prisma.manufacturer.create({ data });
  }

  async findAll() {
    return this.prisma.manufacturer.findMany();
  }

  async findOne(id: number) {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { id },
    });
    if (!manufacturer)
      throw new NotFoundException(`Manufacturer ID ${id} not found`);
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
