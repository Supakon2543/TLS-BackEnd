import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LabTestService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateLabTestDto/*, @Response() res: Response*/) {
      return await this.prisma.lab_test.create({
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
      return this.prisma.lab_test.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const lab_test = await this.prisma.lab_test.findUnique({
        where: { id },
      });
  
      if (!lab_test) {
        throw new NotFoundException(`Lab Test with ID ${id} not found`);
      }
  
      return lab_test;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateLabTestDto/*, @Response() res: Response*/) {
  
      const existingLabTest = await this.prisma.lab_test.findUnique({ where: { id } });
  
      if (!existingLabTest) {
        throw new NotFoundException(`Lab Test with ID ${id} not found`);
      }
  
      return await this.prisma.lab_test.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const lab_test = await this.prisma.lab_test.findUnique({
        where: { id },
      });
  
      if (!lab_test) {
        throw new NotFoundException(`Lab Test with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.lab_test.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateLabTestDto/*, @Response() res: Response*/) {
      const id = payload.id
<<<<<<< HEAD
      const lab_test = await this.prisma.status_request.findUnique({
=======
      const lab_test = await this.prisma.lab_test.findUnique({
>>>>>>> 604a125c958e15b87c14dd7e775088090791d193
        where: { id },
      });
  
      if (!lab_test) {
        return await this.prisma.lab_test.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.lab_test.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.lab_test.findMany({
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
          return await this.prisma.lab_test.findMany({
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
          return await this.prisma.lab_test.findMany({
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
        return await this.prisma.lab_test.findMany({
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
