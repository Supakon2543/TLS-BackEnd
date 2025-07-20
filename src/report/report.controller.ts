import { 
  Controller, 
  Get, 
  Param, 
  ParseIntPipe, 
  HttpException, 
  HttpStatus,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CertTemplateA } from '../certificate/materiaforgen/model';

@Controller('report')
export class ReportController {
  constructor(private readonly certificateService: ReportService) {}

  @Get('data-a/:sampleId')
  async getReportDataA(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<CertTemplateA> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const reportData = await this.certificateService.getReportDataA(sampleId);
      
      if (!reportData) {
        throw new NotFoundException(`Report data not found for sample ID: ${sampleId}`);
      }

      return reportData;
    } catch (error) {
      // Handle specific error types
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }

      // Handle database/service errors
      if (error.message.includes('not found')) {
        throw new NotFoundException(`Sample with ID ${sampleId} not found`);
      }

      // Handle other errors
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Failed to get report data',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}