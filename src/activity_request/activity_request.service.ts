import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateActivityRequestDto } from './dto/create-activity_request.dto';
import { UpdateActivityRequestDto } from './dto/update-activity_request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityRequestService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateActivityRequestDto/*, @Response() res: Response*/) {
      return await this.prisma.activity_request.create({
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
      return this.prisma.activity_request.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const activity_request = await this.prisma.activity_request.findUnique({
        where: { id },
      });
  
      if (!activity_request) {
        throw new NotFoundException(`Activity Request with ID ${id} not found`);
      }
  
      return activity_request;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateActivityRequestDto/*, @Response() res: Response*/) {
  
      const existingActivityRequest = await this.prisma.activity_request.findUnique({ where: { id } });
  
      if (!existingActivityRequest) {
        throw new NotFoundException(`Activity Request with ID ${id} not found`);
      }
  
      return await this.prisma.activity_request.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const activity_request = await this.prisma.activity_request.findUnique({
        where: { id },
      });
  
      if (!activity_request) {
        throw new NotFoundException(`Activity Request with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.activity_request.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateActivityRequestDto/*, @Response() res: Response*/) {
      const id = payload.id
      const activity_request = await this.prisma.activity_request.findUnique({
        where: { id },
      });
  
      if (!activity_request) {
        return await this.prisma.activity_request.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.activity_request.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.activity_request.findMany({
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
          return await this.prisma.activity_request.findMany({
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
          return await this.prisma.activity_request.findMany({
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
        return await this.prisma.activity_request.findMany({
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
