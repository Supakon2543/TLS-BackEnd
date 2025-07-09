import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateLabSiteDto } from './dto/create-lab_site.dto';
import { UpdateLabSiteDto } from './dto/update-lab_site.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LabSiteService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() payload: CreateLabSiteDto) {
    return await this.prisma.lab_site.create({
      data: payload,
    });
  }

  findAll() {
    return this.prisma.lab_site.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async findOne(@Param() id: string) {
    const lab_site = await this.prisma.lab_site.findUnique({
      where: { id },
    });

    if (!lab_site) {
      throw new NotFoundException(`Lab site with ID ${id} not found`);
    }

    return lab_site;
  }

  async update(@Param() id: string, @Body() payload: UpdateLabSiteDto) {
    const existingLabSite = await this.prisma.lab_site.findUnique({
      where: { id },
    });

    if (!existingLabSite) {
      throw new NotFoundException(`Lab site with ID ${id} not found`);
    }

    return await this.prisma.lab_site.update({
      where: { id },
      data: payload,
    });
  }

  async remove(@Param() id: string) {
    // Check if user exists before deleting
    const lab_site = await this.prisma.lab_site.findUnique({
      where: { id },
    });

    if (!lab_site) {
      throw new NotFoundException(`Lab Site with ID ${id} not found`);
    }

    // Perform the delete operation
    return this.prisma.lab_site.delete({
      where: { id },
    });
  }

  async create_update(@Body() payload: CreateLabSiteDto) {
    const id = payload.id;
    const lab_site = await this.prisma.lab_site.findUnique({
      where: { id },
    });

    if (!lab_site) {
      return await this.prisma.lab_site.create({
        data: payload,
        select: {
          id: true,
          order: true,
          name: true,
          status: true,
        },
      });
    }

    return await this.prisma.lab_site.update({
      where: { id },
      data: payload,
    });
  }

  async find(params?: {
  id?: string;
  status?: number | string;
  keyword?: string;
}) {
  // Build where clause
  const whereClause: any = {};

  // Add id filter
  if (params?.id && params.id.trim() !== '') {
    whereClause.id = params.id;
  }

  // Add status filter
  if (params?.status !== undefined) {
    const statusValue = typeof params.status === 'string' ? +params.status : params.status;
    if (typeof statusValue === 'number' && !isNaN(statusValue)) {
      whereClause.status = statusValue === 1; // 1 = true, 0 = false
    }
  }

  // Add keyword filter for name
  if (params?.keyword && params.keyword.trim() !== '') {
    whereClause.name = {
      contains: params.keyword.trim(),
      mode: 'insensitive',
    };
  }

  return await this.prisma.lab_site.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    orderBy: { 
      order: 'asc'
    },
    select: {
      id: true,
      name: true,
      status: true,
    }
  });
}
}
