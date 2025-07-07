import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateRequestTypeDto } from './dto/create-request_type.dto';
import { UpdateRequestTypeDto } from './dto/update-request_type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RequestTypeService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateRequestTypeDto/*, @Response() res: Response*/) {
      return await this.prisma.request_type.create({
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
      return this.prisma.request_type.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const request_type = await this.prisma.request_type.findUnique({
        where: { id },
      });
  
      if (!request_type) {
        throw new NotFoundException(`Request type with ID ${id} not found`);
      }
  
      return request_type;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateRequestTypeDto/*, @Response() res: Response*/) {
  
      const existingRequestType = await this.prisma.request_type.findUnique({ where: { id } });
  
      if (!existingRequestType) {
        throw new NotFoundException(`Request type with ID ${id} not found`);
      }
  
      return await this.prisma.request_type.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const request_type = await this.prisma.request_type.findUnique({
        where: { id },
      });
  
      if (!request_type) {
        throw new NotFoundException(`Request type with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.request_type.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateRequestTypeDto/*, @Response() res: Response*/) {
      const id = payload.id
      const request_type = await this.prisma.request_type.findUnique({
        where: { id },
      });
  
      if (!request_type) {
        return await this.prisma.request_type.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.request_type.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.request_type.findMany({
            where: {
              status: true
            },
            orderBy: { 
              order: 'asc'
            },
            select: {
              id: true,
              name: true
            }
          });
        }
        else if (status == 2) {
          return await this.prisma.request_type.findMany({
            where: {
              status: false
            },
            orderBy: { 
              order: 'asc'
            },
            select: {
              id: true,
              name: true
            }
          });
        }
        else {
          return await this.prisma.request_type.findMany({
            orderBy: { 
              order: 'asc'
            },
            select: {
              id: true,
              name: true
            }
          });
        }
      }
      else {
        return await this.prisma.request_type.findMany({
          where: { id },
          orderBy: { 
            order: 'asc'
          },
          select: {
            id: true,
            name: true
          }
        });
      }
    }
}
