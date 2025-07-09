import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerContactInfoDto } from './dto/create-customer_contact_info.dto';
import { UpdateCustomerContactInfoDto } from './dto/update-customer_contact_info.dto';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as needed

@Injectable()
export class CustomerContactInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateCustomerContactInfoDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.customer_contact_info.create({ data: createData });
    }
    return this.prisma.customer_contact_info.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  async getCustomerContactInfos(params: { id?: number; keyword?: string; status?: number }) {
    let { id, keyword, status } = params;
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

    if (id == 0 || Number.isNaN(id) || typeof id === 'string') {
      if (keyword || status) {
        return this.prisma.customer_contact_info.findMany({
          where: {
            ...(typeof status === 'number' && status !== 0 ? { status: status === 1 } : {}),
            ...(keyword && { name: { contains: keyword, mode: 'insensitive' } }),
          },
          orderBy: { name: 'asc' },
        });
      }
      return [];
    }

    return this.prisma.customer_contact_info.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0 ? { status: status === 1 } : {}),
        ...(keyword && { name: { contains: keyword, mode: 'insensitive' } }),
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const info = await this.prisma.customer_contact_info.findUnique({ where: { id } });
    if (!info) throw new NotFoundException(`CustomerContactInfo with ID ${id} not found`);
    return info;
  }

  async update(id: number, updateDto: UpdateCustomerContactInfoDto) {
    await this.findOne(id);
    return this.prisma.customer_contact_info.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.customer_contact_info.delete({ where: { id } });
  }
}