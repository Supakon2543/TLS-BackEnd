import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateActivityEquipmentDto } from './dto/create-activity_equipment.dto';
import { UpdateActivityEquipmentDto } from './dto/update-activity_equipment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityEquipmentService {
  constructor(private prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateActivityEquipmentDto/*, @Response() res: Response*/) {
      return await this.prisma.activity_equipment.create({
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
      return this.prisma.activity_equipment.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const activity_equipment = await this.prisma.activity_equipment.findUnique({
        where: { id },
      });
  
      if (!activity_equipment) {
        throw new NotFoundException(`Activity Equipment with ID ${id} not found`);
      }
  
      return activity_equipment;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateActivityEquipmentDto/*, @Response() res: Response*/) {
  
      const existingActivityEquipment = await this.prisma.activity_equipment.findUnique({ where: { id } });
  
      if (!existingActivityEquipment) {
        throw new NotFoundException(`Activity Equipment with ID ${id} not found`);
      }
  
      return await this.prisma.activity_equipment.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const activity_equipment = await this.prisma.activity_equipment.findUnique({
        where: { id },
      });
  
      if (!activity_equipment) {
        throw new NotFoundException(`Activity Equipment with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.activity_equipment.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateActivityEquipmentDto/*, @Response() res: Response*/) {
      const id = payload.id
      const activity_equipment = await this.prisma.activity_equipment.findUnique({
        where: { id },
      });
  
      if (!activity_equipment) {
        return await this.prisma.activity_equipment.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.activity_equipment.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Body() payload: {id: string, status: number}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "") {
        if (status == 1){
          return await this.prisma.activity_equipment.findMany({
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
          return await this.prisma.activity_equipment.findMany({
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
          return await this.prisma.activity_equipment.findMany({
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
        return await this.prisma.activity_equipment.findMany({
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
