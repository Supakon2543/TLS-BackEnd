import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoxDto } from './dto/create-box.dto';

@Injectable()
export class BoxService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(data: CreateBoxDto) {

    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, ...createData } = data;
      return this.prisma.box.create({ data: createData });
    }
    return this.prisma.box.upsert({
      where: { id: data.id },
      create: { ...data}, // Create a new record with the provided data
      update: data, // Update the existing record with the provided data
    });
  }

  async create(createBoxDto: CreateBoxDto) {
    return this.prisma.box.create({
      data: createBoxDto,
    });
  }

  async getBoxes(params: { id?: number; keyword?: string; status?: number }) {
    const { id, keyword, status } = params;

    return this.prisma.box.findMany({
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

  async findAll() {
    return this.prisma.box.findMany();
  }

  async findOne(id: number) {
    return this.prisma.box.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateBoxDto: CreateBoxDto) {
    return this.prisma.box.update({
      where: { id },
      data: updateBoxDto,
    });
  }

  async remove(id: number) {
    return this.prisma.box.delete({
      where: { id },
    });
  }
}