import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateStatusEquipmentDto } from './dto/create-status_equipment.dto';
import { UpdateStatusEquipmentDto } from './dto/update-status_equipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatusEquipmentService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateStatusEquipmentDto/*, @Response() res: Response*/) {
      return await this.prisma.status_equipment.create({
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
      return this.prisma.status_equipment.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const status_equipment = await this.prisma.status_equipment.findUnique({
        where: { id },
      });
  
      if (!status_equipment) {
        throw new NotFoundException(`Status Equipment with ID ${id} not found`);
      }
  
      return status_equipment;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateStatusEquipmentDto/*, @Response() res: Response*/) {
  
      const existingStatusEquipment = await this.prisma.status_equipment.findUnique({ where: { id } });
  
      if (!existingStatusEquipment) {
        throw new NotFoundException(`Status Equipment with ID ${id} not found`);
      }
  
      return await this.prisma.status_equipment.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const status_equipment = await this.prisma.status_equipment.findUnique({
        where: { id },
      });
  
      if (!status_equipment) {
        throw new NotFoundException(`Status Equipment with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.status_equipment.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateStatusEquipmentDto/*, @Response() res: Response*/) {
      const id = payload.id
      const status_equipment = await this.prisma.status_equipment.findUnique({
        where: { id },
      });
  
      if (!status_equipment) {
        return await this.prisma.status_equipment.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.status_equipment.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.status_equipment.findMany({
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
          return await this.prisma.status_equipment.findMany({
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
          return await this.prisma.status_equipment.findMany({
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
        return await this.prisma.status_equipment.findMany({
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
