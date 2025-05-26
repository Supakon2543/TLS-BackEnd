import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { map } from 'rxjs';

@Injectable()
export class BoxService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(data: CreateBoxDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id,created_on,updated_on, ...createData } = data;
      return this.prisma.box.create({ data: createData });
    }
    return this.prisma.box.upsert({
      where: { id: data.id },
      create: { ...data}, // Create a new record with the provided data
      update: { ...data }, // Update the existing record with the provided data
    });
  }

  async create(createBoxDto: CreateBoxDto) {
    return this.prisma.box.create({
      data: createBoxDto,
    });
  }

  async getBoxes(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      return [];
    }

    const box = await this.prisma.box.findMany({
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
      include: {
        location: {
          select: { name: true },
        },
        section: {
          select: { name: true },
        },
      },
    });
    
    
    return box.map((box) => ({
      ...box,
      location_name: box.location?.name,
      section_name: box.section?.name,
      location: undefined,
      section: undefined,
    }));

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