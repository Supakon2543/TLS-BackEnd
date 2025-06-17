import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaveRequestDto } from './dto/save-request.dto';
import e from 'express';

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

    async save(@Body() payload: any) {
      // Extract main request and nested arrays/objects
      const {
        request,
        request_email,
        request_detail,
        request_detail_attachment,
        request_sample,
        request_log,
      } = payload;

      if (request_log.activity_request_id == "DRAFT") {
        request.status_request_id = "DRAFT";
      }
      else if (request_log.activity_request_id == "SEND") {
        request.status_request_id = "REVIEW";
        request.review_role_id = "REQ_HEAD";
        if (request.request_type_id == "REQUEST") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'REQUEST' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          request.request_number = "RQ" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
        else if (request.request_type_id == "ROUTINE") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'ROUTINE' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          request.request_number = "RT" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
        else if (request.request_type_id == "QIP") {
          const last_request = await this.prisma.request.findFirst({
            where: { request_type_id: 'QIP' },
            orderBy: { created_on: 'desc' },
          });

          // Get current year as 2 digits
          const year = new Date().getFullYear().toString().slice(-2);

          let lastNumber = 0;
          if (last_request?.request_number) {
            // Expect format: RQYYNNNN, e.g., RQ240001
            const lastReqNum = String(last_request.request_number);
            // Only increment if the year matches, otherwise reset to 0
            const lastYear = lastReqNum.slice(2, 4);
            if (lastYear === year) {
              lastNumber = parseInt(lastReqNum.slice(-4), 10) || 0;
            }
          }
          request.request_number = "RE" + year + (lastNumber + 1).toString().padStart(4, "0");
        }
      }
  
      // 1. Upsert main request and get the id
      const mainRequest = await this.prisma.request.upsert({
        where: { id: request.id ?? 0 },
        update: { ...request },
        create: { ...request },
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
      // Ensure request_log is always a record (single object)
      const record = request_log
        ? { ...request_log, request_id: requestId }
        : undefined;

      // 3. Upsert or replace nested entities
      await this.prisma.request_email.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_detail_attachment.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_sample.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_log.deleteMany({ where: { request_id: requestId } });
      await this.prisma.request_detail.deleteMany({ where: { request_id: requestId } });

      await this.prisma.request_email.createMany({ data: emails });
      if (detail) await this.prisma.request_detail.create({ data: detail });
      await this.prisma.request_detail_attachment.createMany({ data: attachments });

      for (const sample of samples) {
        const { request_sample_item, request_sample_chemical, request_sample_microbiology, ...sampleData } = sample;
        const createdSample = await this.prisma.request_sample.create({
          data: sampleData,
        });

        const sampleId = createdSample.id;

        const items = (request_sample_item ?? []).map(i => ({ ...i, request_sample_id: sampleId }));
        const chemicals = (request_sample_chemical ?? []).map(c => ({ ...c, request_sample_id: sampleId }));
        const micro = (request_sample_microbiology ?? []).map(m => ({ ...m, request_sample_id: sampleId }));

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

      if (record) {
        await this.prisma.request_log.create({ data: record });
      }

      // 4. Return the full request info
      return this.get_info({ id: requestId });
    }
}
