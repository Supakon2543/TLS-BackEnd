import { Body, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { CreateTestReportFormatDto } from './dto/create-test_report_format.dto';
import { UpdateTestReportFormatDto } from './dto/update-test_report_format.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestReportFormatService {
  constructor(private readonly prisma: PrismaService){}
    async create(/*@Request() req: Request, */@Body() payload: CreateTestReportFormatDto/*, @Response() res: Response*/) {
      return await this.prisma.test_report_format.create({
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
      return this.prisma.test_report_format.findMany({
        orderBy: { order: 'asc' },
      });
    }
    
  
    async findOne(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      const test_report_format = await this.prisma.test_report_format.findUnique({
        where: { id },
      });
  
      if (!test_report_format) {
        throw new NotFoundException(`Test Report Format with ID ${id} not found`);
      }
  
      return test_report_format;
    }
  
    async update(/*@Request() req: Request, */@Param() id: string, @Body() payload: UpdateTestReportFormatDto/*, @Response() res: Response*/) {
  
      const existingTestReportFormat = await this.prisma.test_report_format.findUnique({ where: { id } });
  
      if (!existingTestReportFormat) {
        throw new NotFoundException(`Test Report Format with ID ${id} not found`);
      }
  
      return await this.prisma.test_report_format.update({
        where: { id },
        data: payload,
      });
    }
  
    async remove(/*@Request() req: Request, */@Param() id: string/*, @Response() res: Response*/) {
      // Check if user exists before deleting
      const test_report_format = await this.prisma.test_report_format.findUnique({
        where: { id },
      });
  
      if (!test_report_format) {
        throw new NotFoundException(`Test Report Format with ID ${id} not found`);
      }
  
      // Perform the delete operation
      return this.prisma.test_report_format.delete({
        where: { id },
      });
    }

    async create_update(/*@Request() req: Request, */@Body() payload: CreateTestReportFormatDto/*, @Response() res: Response*/) {
      const id = payload.id
      const test_report_format = await this.prisma.test_report_format.findUnique({
        where: { id },
      });
  
      if (!test_report_format) {
        return await this.prisma.test_report_format.create({
          data: payload,
          select: {
            id: true,
            order: true,
            name: true,
            status :true
          },
        });
      }

      return await this.prisma.test_report_format.update({
        where: { id },
        data: payload,
      });
    }

    async find(@Query() payload: {id?: string; status?: number;}/*@Request() req: Request, @Response() res: Response*/) {
      const id = payload.id
      const status = payload.status
      if (id == "" || id == null || id == undefined) {
        if (status == 1){
          return await this.prisma.test_report_format.findMany({
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
          return await this.prisma.test_report_format.findMany({
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
          return await this.prisma.test_report_format.findMany({
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
        return await this.prisma.test_report_format.findMany({
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
