import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationEmailDto } from './dto/create-location_email.dto';
import { UpdateLocationEmailDto } from './dto/update-location_email.dto';
import { map } from 'rxjs';

@Injectable()
export class LocationEmailService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateLocationEmailDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data; // Destructure to exclude id
      return this.prisma.location_email.create({ data: createData }); // Create a new record
    }
  return this.prisma.location_email.upsert({
    where: { id: data.id },
    create: { ...data }, // Create a new record with the provided data
    update: data, // Update the existing record with the provided data
  });
}

  //getLocationsEmail
  async getLocationEmails(params: {
    id?: number | string;
    keyword?: string;
    status?: number | string;
  }) {
    let { id, keyword, status } = params;

    // Convert id and status to numbers if they are strings
    id = id !== undefined ? +id : undefined;
    status = status !== undefined ? +status : undefined;

     const locationEmail = await this.prisma.location_email.findMany({
      where: {
        ...(id && { id }),
        ...(typeof status === 'number' && status !== 0
          ? { status: status === 1 }
          : {}),
        ...(keyword && {
          name: { contains: keyword, mode: 'insensitive' },
        }),
      },
      orderBy: { email_notification: 'asc' },
      include: {
        user_location: {
          select: { name: true },
        },
      },
    });
    
    return locationEmail.map(s => ({
      ...s,
      user_location_name: s.user_location?.name ?? null,
      user_location: undefined, // Optionally remove the nested object
    }));
  }

  async create(data: CreateLocationEmailDto) {
    return this.prisma.location_email.create({ data });
  }

  async findAll() {
    return this.prisma.location_email.findMany();
  }

  async findOne(id: number) {
    const record = await this.prisma.location_email.findUnique({ where: { id } });
    if (!record) throw new NotFoundException(`LocationEmail ID ${id} not found`);
    return record;
  }

  async update(id: number, data: UpdateLocationEmailDto) {
    await this.findOne(id);
    return this.prisma.location_email.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.location_email.delete({ where: { id } });
  }
}

