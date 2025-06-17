import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveRequestDto } from './dto/save-request.dto';

@Injectable()
export class RequestService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateRequestDto/*, @Response() res: Response*/) {
      return await this.prisma.request.create({
        data: payload,
        // select: {
        //   id: true,
        //   order: true,
        //   name: true,
        //   status :true
        // },
      });
  
      
    }
  
    findAll(/*@Request() req: Request, @Response() res: Response*/) {
      return this.prisma.request.findMany({
        // orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: number/*, @Response() res: Response*/) {
      const request = await this.prisma.request.findUnique({
        where: { id },
      });
  
      if (!request) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }
  
      return request;
    }
  
    async update(/*@Request() req: Request, */@Param() id: number, @Body() payload: UpdateRequestDto/*, @Response() res: Response*/) {
  
      const existingRequest = await this.prisma.request.findUnique({ where: { id } });
  
      if (!existingRequest) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }
  
      return await this.prisma.request.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: number/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const request = await this.prisma.request.findUnique({
        where: { id },
      });
  
      if (!request) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.request.delete({
        where: { id },
      });
    }

    async get_info(params: { id?: number | string; }) {
      let { id } = params;

      // Convert id and status to numbers if they are strings 
      id = id !== undefined ? +id : undefined;

      const request = await this.prisma.request.findUnique({
        where: { id },
        include: {
          request_email: true,
          request_detail: true,
          request_detail_attachment: true,
          request_sample: {
            include: {
              request_sample_chemical: true,
              request_sample_microbiology: true,
              request_sample_item: true,
            },
          },
          request_log: true,
        },
      });

      if (!request) {
        throw new NotFoundException(`Request with ID ${id} not found`);
      }

      return request;
    }

    async save(@Body() payload: SaveRequestDto) {
      const {
        id,
        request_email,
        request_detail,
        request_detail_attachment,
        request_sample,
        request_log,
        ...rest
      } = payload;

      // 1. Upsert main request and get the id
      const mainRequest = await this.prisma.request.upsert({
        where: { id: id ?? 0 },
        update: { ...rest },
        create: { ...rest },
      });

      const requestId = mainRequest.id;

      // 2. Prepare nested DTOs with correct request_id
      const emails = (request_email ?? []).map(e => ({ ...e, request_id: requestId }));
      const detail = request_detail ? { ...request_detail, request_id: requestId } : undefined;
      const attachments = (request_detail_attachment ?? []).map(a => ({ ...a, request_id: requestId }));
      const samples = (request_sample ?? []).map(s => ({
        ...s,
        request_id: requestId,
        request_sample_item: s.request_sample_item?.map(i => ({ ...i })) ?? [],
        request_sample_chemical: s.request_sample_chemical?.map(c => ({ ...c })) ?? [],
        request_sample_microbiology: s.request_sample_microbiology?.map(m => ({ ...m })) ?? [],
      }));
      const logs = (request_log ?? []).map(l => ({ ...l, request_id: requestId }));

      // 3. Upsert or replace nested entities
      // Delete old nested data
      await this.prisma.request_email.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_detail_attachment.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_sample.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_log.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_detail.deleteMany({ where: { request_id: requestId } });

      // Create new nested data
      await this.prisma.request_email.createMany({ data: emails });
      if (detail) await this.prisma.request_detail.create({ data: detail });
      await this.prisma.request_detail_attachment.createMany({ data: attachments });

      for (const sample of samples) {
        // Create the sample first, without nested children
        const { request_sample_item, request_sample_chemical, request_sample_microbiology, ...sampleData } = sample;
        const createdSample = await this.prisma.request_sample.create({
          data: sampleData,
        });

        const sampleId = createdSample.id;

        // Prepare nested children with correct request_sample_id
        const items = (request_sample_item ?? []).map(i => ({ ...i, request_sample_id: sampleId }));
        const chemicals = (request_sample_chemical ?? []).map(c => ({ ...c, request_sample_id: sampleId }));
        const micro = (request_sample_microbiology ?? []).map(m => ({ ...m, request_sample_id: sampleId }));

        // Create nested children
        if (items.length > 0) {
          await this.prisma.request_sample_item.createMany({ data: items });
        }
        if (chemicals.length > 0) {
          await this.prisma.request_sample_chemical.createMany({ data: chemicals });
        }
        if (micro.length > 0) {
          await this.prisma.request_sample_microbiology.createMany({ data: micro });
        }
      }

      await this.prisma.request_log.createMany({ data: logs });

      // 4. Return the full request info
      return this.get_info({id: requestId});
    }
}
