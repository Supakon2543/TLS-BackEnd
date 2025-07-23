import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertImageToBase64 } from '../certificate/materiaforgen/convertImageToBase64';
import { CertTemplateA } from '../certificate/materiaforgen/model';
import generateReportA from '../certificate/materiaforgen/certificate-a';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {} 

  async getReportDataA(sampleId: number): Promise<CertTemplateA> {
    try {
      // Get signature image
      const signatureBase64 = await convertImageToBase64(
        './images/signature.png', // Adjust the path as needed
      );

      // Get sample data with all required relationships
      const sampleData = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
          material_code: true,
          material_id: true,
          // Get request data
          request: {
            select: {
              id: true,
              requester_id: true,
              lab_site_id: true,
              lab_site: {
                select: {
                  id: true,
                  name: true,
                },
              },
              request_detail: {
                select: {
                  request_id: true,
                  received_date: true,
                  report_heading: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              // Get request logs for report date
              request_log: {
                where: {
                  activity_request_id: 'RELEASE',
                },
                select: {
                  timestamp: true,
                },
                orderBy: {
                  timestamp: 'desc',
                },
                take: 1,
              },
            },
          },
          // Get sample description
          sample_description: {
            select: {
              name: true,
            },
          },
          // Get sample items for condition and dates
          request_sample_item: {
            select: {
              sample_condition: {
                select: {
                  name: true,
                },
              },
            },
            take: 1,
          },
          // Get material data
          material: {
            select: {
              reg_no: true,
              // Get chemical parameters through material_chemical
              material_chemical: {
                select: {
                  chemical_parameter: {
                    select: {
                      id: true,
                      name: true,
                      name_abb: true,
                      order: true,
                      final_result: true,
                      decimal: true,
                      unit: {
                        select: {
                          name: true,
                        },
                      },
                      // Get sample descriptions for LOD/LOQ
                      chemical_sample_description: {
                        select: {
                          lod_value: true,
                          loq_value: true,
                        },
                      },
                    },
                  },
                },
                orderBy: {
                  chemical_parameter: {
                    order: 'asc',
                  },
                },
              },
              // Get microbiology parameters through material_microbiology
              material_microbiology: {
                select: {
                  microbiology_parameter: {
                    select: {
                      id: true,
                      name: true,
                      name_abb: true,
                      order: true,
                      final_result: true,
                      decimal: true,
                      unit: {
                        select: {
                          name: true,
                        },
                      },
                      // Get sample descriptions for LOD/LOQ
                      microbiology_sample_description: {
                        select: {
                          lod_value: true,
                          loq_value: true,
                        },
                      },
                    },
                  },
                },
                orderBy: {
                  microbiology_parameter: {
                    order: 'asc',
                  },
                },
              },
            },
          },
        },
      });

      if (!sampleData) {
        throw new Error(`Sample with ID ${sampleId} not found`);
      }

      // Get lab site address
      const labSiteAddress = this.getLabSiteAddress(
        sampleData.request.lab_site?.name || '',
      );

      // Build table_source array with type inference
      const tableSource = [
        {
          test_items: '',
          lod: '',
          loq: '',
          results: '',
          specification: '',
          unit: '',
          method: '',
          is_header: false,
          is_special: false,
        },
      ].slice(0, 0); 

      // Add Chemical Test header
      const chemicalTests = sampleData.material?.material_chemical || [];
      if (chemicalTests.length > 0) {
        // Add chemical parameters
        chemicalTests.forEach(({ chemical_parameter }) => {
    const param = chemical_parameter;
    const sampleDesc = param.chemical_sample_description?.[0];

    // Results logic: Check decimal first, then final_result
    let results = '';
    if (param.decimal !== null && param.decimal !== undefined) {
      results = param.decimal.toString();
    } else if (param.final_result !== null && param.final_result !== undefined) {
      results = 'Passed';
    } else {
      results = 'Not Passed';
    }

    tableSource.push({
      test_items: param.name,
      lod: sampleDesc?.lod_value || '-',
      loq: sampleDesc?.loq_value || '-',
      results: results,
      specification: '', // Add your specification logic here
      unit: param.unit?.name || '-',
      method: '', // Add your method logic here
      is_header: false,
      is_special: false,
    });
  });
}

      // Add Microbiology Test header
      const microbiologyTests =
        sampleData.material?.material_microbiology || [];
      if (microbiologyTests.length > 0) {
        // Add microbiology parameters
        microbiologyTests.forEach(({ microbiology_parameter }) => {
          const param = microbiology_parameter;
          const sampleDesc = param.microbiology_sample_description?.[0];

          tableSource.push({
            test_items: param.name,
            lod: sampleDesc?.lod_value || '-',
            loq: sampleDesc?.loq_value || '-',
            results: '', // Add your results logic here
            specification: '', // Add your specification logic here
            unit: param.unit?.name || '-',
            method: '', // Add your method logic here
            is_header: false,
            is_special: false,
          });
        });
      }

      // Build the response data with proper null safety
      const data: CertTemplateA = {
        file_name: `${sampleData.sample_name} ${sampleData.batch_no} (Rev.00)`,
        is_accredited: false, // You may want to get this from database
        header: {
          // Fix: Add proper null safety for request_detail
          report_heading:
            sampleData.request?.request_detail?.[0]?.report_heading?.name || '',
          sample_name: sampleData.sample_name || '',
          sample_detail: sampleData.batch_no || '',
          sample_description: sampleData.sample_description?.name || '',
          sample_condition:
            sampleData.request_sample_item?.[0]?.sample_condition?.name || '',
          analysis_date: new Date().toLocaleDateString('en-GB'),
          customer_contact: `Refer as Lab Services Agreement (S-AY-Q-QCD-0115 Rev.02)`,
          sample_code: sampleData.sample_code || '',
          received_date:
            sampleData.request?.request_detail?.[0]?.received_date?.toLocaleDateString(
              'en-GB',
            ) || '',
          report_date: sampleData.request?.request_log?.[0]?.timestamp
            ? new Date(
                sampleData.request.request_log[0].timestamp,
              ).toLocaleDateString('en-GB')
            : new Date().toLocaleDateString('en-GB'),
          report_no: sampleData.sample_code || '',
          reg_no: sampleData.material?.reg_no || '',
        },
        table_source: tableSource,
        decision: '', // You may want to calculate this based on results
        remark: [], // You may want to get this from database
        approver: {
          name: 'Tananat Khorubklang', // You may want to get this from database
          position: 'Quality Control Chemical, Physical and FG Lead',
          signature: signatureBase64,
        },
        footer: {
          form_id: 'F-AY-Q-QCC-030',
          revision: '04',
          effective_date: '11 Dec 2024',
          address: labSiteAddress,
        },
      };

      return data;
    } catch (error) {
      console.error('Error getting report data A:', error);
      throw new Error(`Failed to get report data A: ${error.message}`);
    }
  }

  async generateReportA(sampleId: number): Promise<string> {
    try {
      // Get the report data first
      const reportData = await this.getReportDataA(sampleId);
      
      // Generate the PDF and return base64
      const pdfBase64 = await generateReportA(reportData);
      
      return pdfBase64;
    } catch (error) {
      console.error('Error generating report A:', error);
      throw new Error(`Failed to generate report A: ${error.message}`);
    }
  }

  //test





  // Helper method to get lab site address
  private getLabSiteAddress(labSiteId: string): string {
    if (labSiteId === 'AY') {
      return '48/2 Moo.7 Asian Highway Road, Khlong Suan Plu, Phra Nakorn Si Ayutthaya 13000 THAILAND (Tel : 02-351-1123)';
    } else if (labSiteId === 'HM') {
      return '348 Ramkhamhaeng Road, Huamak, Bangkapi, Bangkok 10240 Thailand';
    }
    return '48/2 Moo.7 Asian Highway Road, Khlong Suan Plu, Phra Nakorn Si Ayutthaya 13000 THAILAND (Tel : 02-351-1123)';
  }

  // Helper method to get parameter result - you need to implement this based on your result storage
  private getParameterResult(
    parameterId: number,
    type: 'chemical' | 'microbiology',
  ): string {
    // This should query your results table
    // For now, returning placeholder
    return 'Passed';
  }

  // Helper method to get parameter specification - you need to implement this based on your spec storage
  private getParameterSpec(
    parameterId: number,
    type: 'chemical' | 'microbiology',
  ): string {
    // This should query your specification table
    // For now, returning placeholder
    return 'Within specification';
  }

  // Helper method to get parameter method - you need to implement this based on your method storage
  private getParameterMethod(
    parameterId: number,
    type: 'chemical' | 'microbiology',
  ): string {
    // This should query your method table
    // For now, returning placeholder
    return 'In-house method';
  }
}
