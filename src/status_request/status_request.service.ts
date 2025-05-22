import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateStatusRequestDto } from './dto/create-status_request.dto';
import { UpdateStatusRequestDto } from './dto/update-status_request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusRequestService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateStatusRequestDto/*, @Response() res: Response*/) {
      return await this.prisma.status_request.create({
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
      return this.prisma.status_request.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const status_request = await this.prisma.status_request.findUnique({
        where: { id },
      });
  
      if (!status_request) {
        throw new NotFoundException(`Status Request with ID ${id} not found`);
      }
  
      return status_request;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateStatusRequestDto/*, @Response() res: Response*/) {
  
      const existingStatusRequest = await this.prisma.status_request.findUnique({ where: { id } });
  
      if (!existingStatusRequest) {
        throw new NotFoundException(`Status Request with ID ${id} not found`);
      }
  
      return await this.prisma.status_request.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const status_request = await this.prisma.status_request.findUnique({
        where: { id },
      });
  
      if (!status_request) {
        throw new NotFoundException(`Status Request with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.status_request.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateStatusRequestDto/*, @Response() res: Response*/) {
      const id = payload.id
      const status_request = await this.prisma.status_request.findUnique({
        where: { id },
      });
  
      if (!status_request) {
        return await this.prisma.status_request.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.status_request.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.status_request.findMany({
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
          })
        }
        else if (status == 2) {
          return await this.prisma.status_request.findMany({
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
          })
        }
        else {
          return await this.prisma.status_request.findMany({
            orderBy: { 
              order: 'asc'
            },
            select: {
              id: true,
              name: true
            }
          })
        }
      }
      else {
        return await this.prisma.status_request.findMany({
          where: { id },
          orderBy: { 
            order: 'asc'
          },
          select: {
            id: true,
            name: true
          }
        })
      }
    }
}
