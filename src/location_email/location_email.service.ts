import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationEmailDto } from './dto/create-location_email.dto';
import { UpdateLocationEmailDto } from './dto/update-location_email.dto';

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

  const where: any = {};
  if (id !== undefined && id !== null) where.id = String(id);
  if (keyword) where.name = { contains: keyword, mode: 'insensitive' };

  // Build filter for location_emails relation
  let locationEmailWhere: any = undefined;
  if (status !== undefined && status !== null && status !== 0) {
    const statusBool = status === 1 || status === '1';
    locationEmailWhere = { status: statusBool };
  }

  const userLocations = await this.prisma.user_location.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      location_emails: locationEmailWhere ? { where: locationEmailWhere } : true,
    },
  });

  const result: any[] = [];
userLocations.forEach(u => {
  // Only push "empty" user_location if status param is NOT set
  if ((status === undefined || status === null || status === 0) && u.location_emails.length === 0) {
    result.push({
      id: null,
      user_location_id: u.id,
      user_location_name: u.name,
      email_notification: null,
      status: null,
      created_on: null,
      created_by: null,
      updated_on: null,
      updated_by: null,
    });
  } else {
    u.location_emails.forEach(e => {
      result.push({
        id: e.id,
        user_location_id: u.id,
        user_location_name: u.name,
        email_notification: e.email_notification,
        status: e.status,
        created_on: e.created_on,
        created_by: e.created_by,
        updated_on: e.updated_on,
        updated_by: e.updated_by,
      });
    });
  }
});

  return result;
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

