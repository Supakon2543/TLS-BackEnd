import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateSampleConditionDto } from './dto/create-sample_condition.dto';
import { UpdateSampleConditionDto } from './dto/update-sample_condition.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleConditionService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateSampleConditionDto/*, @Response() res: Response*/) {
      return await this.prisma.sample_condition.create({
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
      return this.prisma.sample_condition.findMany({
        orderBy: [
            { order: 'asc' },
            { name: 'asc' },
          ],
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const sample_condition = await this.prisma.sample_condition.findUnique({
        where: { id },
      });
  
      if (!sample_condition) {
        throw new NotFoundException(`Sample Condition with ID ${id} not found`);
      }
  
      return sample_condition;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateSampleConditionDto/*, @Response() res: Response*/) {
  
      const existingSampleCondition = await this.prisma.sample_condition.findUnique({ where: { id } });
  
      if (!existingSampleCondition) {
        throw new NotFoundException(`Sample Condition with ID ${id} not found`);
      }
  
      return await this.prisma.sample_condition.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const sample_condition = await this.prisma.sample_condition.findUnique({
        where: { id },
      });
  
      if (!sample_condition) {
        throw new NotFoundException(`Sample Condition with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.sample_condition.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateSampleConditionDto/*, @Response() res: Response*/) {
      const id = payload.id
      const sample_condition = await this.prisma.sample_condition.findUnique({
        where: { id },
      });
  
      if (!sample_condition) {
        return await this.prisma.sample_condition.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.sample_condition.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.sample_condition.findMany({
            where: {
              status: true
            },
            orderBy: [
            { order: 'asc' },
            { name: 'asc' },
          ],
            select: {
              id: true,
              name: true
            }
          })
        }
        else if (status == 2) {
          return await this.prisma.sample_condition.findMany({
            where: {
              status: false
            },
            orderBy: [
            { order: 'asc' },
            { name: 'asc' },
          ],
            select: {
              id: true,
              name: true
            }
          })
        }
        else {
          return await this.prisma.sample_condition.findMany({
            orderBy: [
            { order: 'asc' },
            { name: 'asc' },
          ],
            select: {
              id: true,
              name: true
            }
          })
        }
      }
      else {
        return await this.prisma.sample_condition.findMany({
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
