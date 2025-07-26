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
import { CertTemplateA, CertTemplateB,CertTemplateC,CertTemplateD,CertTemplateE  } from '../certificate/materiaforgen/model';

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

  @Get('generate-a/:sampleId')
  async generateReportA(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const result = await this.certificateService.generateReportA(sampleId);
      
      if (!result) {
        throw new NotFoundException(`Could not generate report for sample ID: ${sampleId}`);
      }

      return result;
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
          error: 'Failed to generate report',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('data-b/:sampleId')
  async getReportDataB(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<CertTemplateB> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const reportData = await this.certificateService.getReportDataB(sampleId);
      
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

  @Get('generate-b/:sampleId')
  async generateReportB(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const result = await this.certificateService.generateReportB(sampleId);
      
      if (!result) {
        throw new NotFoundException(`Could not generate report for sample ID: ${sampleId}`);
      }

      return result;
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
          error: 'Failed to generate report',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('data-c/:sampleId')
  async getReportDataC(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<CertTemplateC> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const reportData = await this.certificateService.getReportDataC(sampleId);
      
      if (!reportData) {
        throw new NotFoundException(`Could not retrieve report data for sample ID: ${sampleId}`);
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

  @Get('generate-c/:sampleId')
  async generateReportC(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const result = await this.certificateService.generateReportC(sampleId);
      
      if (!result) {
        throw new NotFoundException(`Could not generate report for sample ID: ${sampleId}`);
      }

      return result;
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
          error: 'Failed to generate report',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('data-d/:sampleId')
  async getReportDataD(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<CertTemplateD> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const reportData = await this.certificateService.getReportDataD(sampleId);
      
      if (!reportData) {
        throw new NotFoundException(`Could not retrieve report data for sample ID: ${sampleId}`);
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

  @Get('generate-d/:sampleId')
  async generateReportD(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const result = await this.certificateService.generateReportD(sampleId);
      
      if (!result) {
        throw new NotFoundException(`Could not generate report for sample ID: ${sampleId}`);
      }

      return result;
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
          error: 'Failed to generate report',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('data-e/:sampleId')
  async getReportDataE(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<CertTemplateE> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const reportData = await this.certificateService.getReportDataE(sampleId);
      
      if (!reportData) {
        throw new NotFoundException(`Could not retrieve report data for sample ID: ${sampleId}`);
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

  @Get('generate-e/:sampleId')
  async generateReportE(@Param('sampleId', ParseIntPipe) sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Validate sample ID
      if (sampleId <= 0) {
        throw new BadRequestException('Sample ID must be a positive number');
      }

      const result = await this.certificateService.generateReportE(sampleId);
      
      if (!result) {
        throw new NotFoundException(`Could not generate report for sample ID: ${sampleId}`);
      }

      return result;
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
          error: 'Failed to generate report',
          message: error.message,
          timestamp: new Date().toISOString(),
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}