import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertImageToBase64 } from '../certificate/materiaforgen/convertImageToBase64';
import { CertTemplateA, CertTemplateB, CertTemplateC, CertTemplateD, CertTemplateE } from '../certificate/materiaforgen/model';
import generateReportA from '../certificate/materiaforgen/certificate-a';
import generateReportB from '../certificate/materiaforgen/certificate-b';
import generateReportC from '../certificate/materiaforgen/certificate-c';
import generateReportD from '../certificate/materiaforgen/certificate-d';
import generateReportE from '../certificate/materiaforgen/certificate-e';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

@Injectable()
export class ReportService {
  private readonly s3 = new S3Client({
    region: process.env.AWS_REGION,
  });
  
  constructor(private readonly prisma: PrismaService) {} 

  

  async getReportDataA(sampleId: number): Promise<CertTemplateA> {
    try {
      // Get signature image for Report A
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

      // Get revision number based on existing files in S3
      const revisionNumber = await this.getRevisionNumber(sampleData.request.id, sampleId);

      // Build the response data with proper null safety
      const data: CertTemplateA = {
        file_name: `${sampleData.sample_name} ${sampleData.batch_no} (${revisionNumber.toString().padStart(2, '0')})`,
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

  async generateReportA(sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Get the report data first
      const reportData = await this.getReportDataA(sampleId);
      console.log(reportData);

      // Generate the PDF and get base64
      const pdfBase64 = await generateReportA(reportData);
      
      // Get sample data to extract request_id
      const sampleInfo = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          request_id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
        },
      });

      if (!sampleInfo) {
        throw new Error(`Sample with ID ${sampleId} not found`);
      }

      // Get revision number
      const revisionString = await this.getRevisionNumber(sampleInfo.request_id, sampleId);
      const revisionNumber = parseInt(revisionString.replace('Rev.', ''), 10);

      // Create filename with revision
      const filename = `${sampleInfo.sample_name}_${sampleInfo.batch_no}_CertA_${revisionString}.pdf`;
      
      // Save to S3
      const s3Path = await this.savePdfToS3(
        pdfBase64,
        sampleInfo.request_id,
        sampleId,
        filename
      );
      
      return { 
        filename: filename,
        path: s3Path,
        revision: revisionNumber
      };
    } catch (error) {
      console.error('Error generating report A:', error);
      throw new Error(`Failed to generate report A: ${error.message}`);
    }
  }

  async getReportDataB(sampleId: number): Promise<CertTemplateB> {
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
          sampling_date: true,
          expiry_date: true,
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

      // Get revision number based on existing files in S3
      const revisionNumber = await this.getRevisionNumber(sampleData.request.id, sampleId);
      
      // Build the response data with proper null safety for Certificate B
      const data: CertTemplateB = {
        file_name: `${sampleData.sample_name} ${sampleData.batch_no} (${revisionNumber.toString().padStart(2, '0')})`,
        is_accredited: false, // You may want to get this from database
        header: {
          // Fix: Add proper null safety for request_detail
          report_heading:
            sampleData.request?.request_detail?.[0]?.report_heading?.name || '',
          product_name: sampleData.sample_name || '',
          lot_no: sampleData.batch_no || '',
          mfg_date: sampleData.sampling_date?.toLocaleDateString('en-GB') || '',
          best_before: sampleData.expiry_date?.toLocaleDateString('en-GB') || '',
          analytical_date: new Date().toLocaleDateString('en-GB'),
          no: sampleData.sample_code || '',
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
        conclusion: '', // You may want to calculate this based on results
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
      console.error('Error getting report data B:', error);
      throw new Error(`Failed to get report data B: ${error.message}`);
    }
  }

  async generateReportB(sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Get the report data first
      const reportData = await this.getReportDataB(sampleId);
      
      // Generate the PDF and get base64
      const pdfBase64 = await generateReportB(reportData);
      
      // Get sample data to extract request_id
      const sampleInfo = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          request_id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
        },
      });

      if (!sampleInfo) {
        throw new Error(`Sample with ID ${sampleId} not found`);
      }

      // Get revision number
      const revisionString = await this.getRevisionNumber(sampleInfo.request_id, sampleId);
      const revisionNumber = parseInt(revisionString.replace('Rev.', ''), 10);

      // Create filename with revision
      const filename = `${sampleInfo.sample_name}_${sampleInfo.batch_no}_CertB_${revisionString}.pdf`;

      // Save to S3
      const s3Path = await this.savePdfToS3(
        pdfBase64,
        sampleInfo.request_id,
        sampleId,
        filename
      );
      
      return { 
        filename: filename,
        path: s3Path,
        revision: revisionNumber
      };
    } catch (error) {
      console.error('Error generating report B:', error);
      throw new Error(`Failed to generate report B: ${error.message}`);
    }
  }

  async getReportDataC(sampleId: number): Promise<CertTemplateC> {
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

      // Build table_source array - same structure as A and B
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

      // Add Chemical and Microbiology parameters (same logic as A and B)
      const chemicalTests = sampleData.material?.material_chemical || [];
      chemicalTests.forEach(({ chemical_parameter }) => {
        const param = chemical_parameter;
        const sampleDesc = param.chemical_sample_description?.[0];

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
          specification: '',
          unit: param.unit?.name || '-',
          method: '',
          is_header: false,
          is_special: false,
        });
      });

      const microbiologyTests = sampleData.material?.material_microbiology || [];
      microbiologyTests.forEach(({ microbiology_parameter }) => {
        const param = microbiology_parameter;
        const sampleDesc = param.microbiology_sample_description?.[0];

        tableSource.push({
          test_items: param.name,
          lod: sampleDesc?.lod_value || '-',
          loq: sampleDesc?.loq_value || '-',
          results: '',
          specification: '',
          unit: param.unit?.name || '-',
          method: '',
          is_header: false,
          is_special: false,
        });
      });

      // Get revision number based on existing files in S3
      const revisionNumber = await this.getRevisionNumber(sampleData.request.id, sampleId);

      // Build Certificate C data (uses HeaderCertA like Certificate A)
      const data: CertTemplateC = {
        file_name: `${sampleData.sample_name} ${sampleData.batch_no} (${revisionNumber.toString().padStart(2, '0')})`,
        is_accredited: false,
        header: {
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
        decision: '', // Certificate C uses decision instead of conclusion
        remark: [],
        approver: {
          name: 'Tananat Khorubklang',
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
      console.error('Error getting report data C:', error);
      throw new Error(`Failed to get report data C: ${error.message}`);
    }
  }

  async generateReportC(sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Get the report data first
      const reportData = await this.getReportDataC(sampleId);
      
      // Generate the PDF and get base64
      const pdfBase64 = await generateReportC(reportData);
      
      // Get sample data to extract request_id
      const sampleInfo = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          request_id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
        },
      });

      if (!sampleInfo) {
        throw new Error(`Sample with ID ${sampleId} not found`);
      }

      // Get revision number
      const revisionString = await this.getRevisionNumber(sampleInfo.request_id, sampleId);
      const revisionNumber = parseInt(revisionString.replace('Rev.', ''), 10);

      // Create filename with revision
      const filename = `${sampleInfo.sample_name}_${sampleInfo.batch_no}_CertC_${revisionString}.pdf`;

      // Save to S3
      const s3Path = await this.savePdfToS3(
        pdfBase64,
        sampleInfo.request_id,
        sampleId,
        filename
      );
      
      return { 
        filename: filename,
        path: s3Path,
        revision: revisionNumber
      };
    } catch (error) {
      console.error('Error generating report C:', error);
      throw new Error(`Failed to generate report C: ${error.message}`);
    }
  }

  async getReportDataD(sampleId: number): Promise<CertTemplateD> {
    try {
      // Get signature image
      const signatureBase64 = await convertImageToBase64(
        './images/signature.png',
      );

      // Get sample data for Certificate D
      const sampleData = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
          request: {
            select: {
              id: true,
              request_number: true,
              request_detail: {
                select: {
                  received_date: true,
                },
              },
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
          material: {
            select: {
              material_chemical: {
                select: {
                  chemical_parameter: {
                    select: {
                      id: true,
                      name: true,
                      unit: {
                        select: {
                          name: true,
                        },
                      },
                    },
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

      // Build table_source for Certificate D (ChemicalCert[])
      const chemicalTests = sampleData.material?.material_chemical || [];
      
      // Build parameter array for chemical tests
      const parameters = chemicalTests.map(({ chemical_parameter }) => ({
        parameter: chemical_parameter.name,
        results: '', // Add your result logic here
        unit: chemical_parameter.unit?.name || '',
        method: '', // Add your method logic here
      }));

      const tableSource = [
        {
          sample_name: sampleData.sample_name || '',
          sample_code: sampleData.sample_code || '',
          sampling_date: new Date().toLocaleDateString('en-GB'),
          time: new Date().toTimeString().split(' ')[0],
          line: 'Production Line', // Add your line logic here
          parameter: parameters,
        },
      ];

      // Get lab site address
      const labSiteAddress = this.getLabSiteAddress('AY'); // Default to AY or determine from data

      // Get revision number based on existing files in S3
      const revisionNumber = await this.getRevisionNumber(sampleData.request.id, sampleId);

      const data: CertTemplateD = {
        file_name: `${sampleData.sample_name} ${sampleData.batch_no} (${revisionNumber.toString().padStart(2, '0')})`,
        header: {
          received_by: 'Lab Services', // You may want to get this from database
          received_date:
            sampleData.request?.request_detail?.[0]?.received_date?.toLocaleDateString(
              'en-GB',
            ) || '',
          request_no: sampleData.request?.request_number || '',
          report_date: sampleData.request?.request_log?.[0]?.timestamp
            ? new Date(
                sampleData.request.request_log[0].timestamp,
              ).toLocaleDateString('en-GB')
            : new Date().toLocaleDateString('en-GB'),
        },
        table_source: tableSource,
        remark: [],
        approver: {
          name: 'Tananat Khorubklang',
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
      console.error('Error getting report data D:', error);
      throw new Error(`Failed to get report data D: ${error.message}`);
    }
  }

  async generateReportD(sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Get the report data first
      const reportData = await this.getReportDataD(sampleId);
      
      // Generate the PDF and get base64
      const pdfBase64 = await generateReportD(reportData);
      
      // Get sample data to extract request_id
      const sampleInfo = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          request_id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
        },
      });

      if (!sampleInfo) {
        throw new Error(`Sample with ID ${sampleId} not found`);
      }

      // Get revision number
      const revisionString = await this.getRevisionNumber(sampleInfo.request_id, sampleId);
      const revisionNumber = parseInt(revisionString.replace('Rev.', ''), 10);

      // Create filename with revision
      const filename = `${sampleInfo.sample_name}_${sampleInfo.batch_no}_CertD_${revisionString}.pdf`;

      // Save to S3
      const s3Path = await this.savePdfToS3(
        pdfBase64,
        sampleInfo.request_id,
        sampleId,
        filename
      );
      
      return { 
        filename: filename,
        path: s3Path,
        revision: revisionNumber
      };
    } catch (error) {
      console.error('Error generating report D:', error);
      throw new Error(`Failed to generate report D: ${error.message}`);
    }
  }

  async getReportDataE(sampleId: number): Promise<CertTemplateE> {
    try {
      // Get signature image
      const signatureBase64 = await convertImageToBase64(
        './images/signature.png',
      );

      // Get sample data for Certificate E (microbiology focused)
      const sampleData = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
          request: {
            select: {
              id: true,
              request_number: true,
              requester: {
                select: {
                  fullname: true,
                },
              },
              request_detail: {
                select: {
                  received_date: true,
                },
              },
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
          material: {
            select: {
              material_microbiology: {
                select: {
                  microbiology_parameter: {
                    select: {
                      id: true,
                      name: true,
                      unit: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          request_sample_item: {
            select: {
              time: true,
            },
          },
        },
      });

      if (!sampleData) {
        throw new Error(`Sample with ID ${sampleId} not found`);
      }

      // Build parameter array for Certificate E
      const microbiologyTests = sampleData.material?.material_microbiology || [];
      const parameters = [
        {
          no: 1,
          param: microbiologyTests.map((test, index) => ({
            id: test.microbiology_parameter.id,
            parameter: test.microbiology_parameter.name,
            unit: test.microbiology_parameter.unit?.name || '',
            method: 'Standard Method', // Add your method logic here
          })),
        },
      ];

      // Build table_source for Certificate E (MicroResultTable[])
      const tableSource = [
        {
          sample_code: sampleData.sample_code || '',
          sample_name: sampleData.sample_name || '',
          time: sampleData.request_sample_item?.[0]?.time || '',
          unit: 'Lab Unit', // Add your unit logic here
          mfg_date: new Date().toLocaleDateString('en-GB'),
          parameter: microbiologyTests.map((test) => ({
            id: test.microbiology_parameter.id,
            result: 'Passed', // Add your result logic here
          })),
        },
      ];

      // Get lab site address
      const labSiteAddress = this.getLabSiteAddress('AY');

      // Get revision number based on existing files in S3
      const revisionNumber = await this.getRevisionNumber(sampleData.request.id, sampleId);

      const data: CertTemplateE = {
        file_name: `${sampleData.sample_name} ${sampleData.batch_no} (${revisionNumber.toString().padStart(2, '0')})`,
        header: {
          request_no: sampleData.request?.request_number || '',
          request_by: sampleData.request?.requester?.fullname || '',
          received_date:
            sampleData.request?.request_detail?.[0]?.received_date?.toLocaleDateString(
              'en-GB',
            ) || '',
          received_by: 'Lab Services',
          analysis_date: new Date().toLocaleDateString('en-GB'),
          report_date: sampleData.request?.request_log?.[0]?.timestamp
            ? new Date(
                sampleData.request.request_log[0].timestamp,
              ).toLocaleDateString('en-GB')
            : new Date().toLocaleDateString('en-GB'),
        },
        parameter: parameters,
        table_source: tableSource,
        remark: [],
        approver: {
          name: 'Tananat Khorubklang',
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
      console.error('Error getting report data E:', error);
      throw new Error(`Failed to get report data E: ${error.message}`);
    }
  }

  async generateReportE(sampleId: number): Promise<{ filename: string; path: string; revision: number }> {
    try {
      // Get the report data first
      const reportData = await this.getReportDataE(sampleId);
      
      // Generate the PDF and get base64
      const pdfBase64 = await generateReportE(reportData);
      
      // Get sample data to extract request_id
      const sampleInfo = await this.prisma.request_sample.findUnique({
        where: { id: sampleId },
        select: {
          request_id: true,
          sample_code: true,
          sample_name: true,
          batch_no: true,
        },
      });

      if (!sampleInfo) {
        throw new Error(`Sample with ID ${sampleId} not found`);
      }

      // Get revision number
      const revisionString = await this.getRevisionNumber(sampleInfo.request_id, sampleId);
      const revisionNumber = parseInt(revisionString.replace('Rev.', ''), 10);

      // Create filename with revision
      const filename = `${sampleInfo.sample_name}_${sampleInfo.batch_no}_CertE_${revisionString}.pdf`;

      // Save to S3
      const s3Path = await this.savePdfToS3(
        pdfBase64,
        sampleInfo.request_id,
        sampleId,
        filename
      );
      
      return { 
        filename: filename,
        path: s3Path,
        revision: revisionNumber
      };
    } catch (error) {
      console.error('Error generating report E:', error);
      throw new Error(`Failed to generate report E: ${error.message}`);
    }
  }

  //test
  
  // Helper method to count existing files in S3 location for revision numbering
  private async getRevisionNumber(requestId: number, sampleId: number): Promise<string> {
    try {
      // Create S3 prefix to search for existing files
      const s3Prefix = `tls/${process.env.ENVNAME}/request/${requestId}/certificate/${sampleId}/`;
      
      // List objects with the prefix
      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.AWS_S3_BUCKET!,
        Prefix: s3Prefix,
      });
      
      const response = await this.s3.send(listCommand);
      const fileCount = response.Contents?.length || 0;
      
      // Format revision number with leading zero (Rev.00, Rev.01, etc.)
      const revisionNumber = fileCount.toString().padStart(2, '0');
      return `Rev.${revisionNumber}`;
    } catch (error) {
      console.error('Error getting revision number from S3:', error);
      // Return Rev.00 as fallback
      return 'Rev.00';
    }
  }
  
  // Helper method to save PDF to S3
  private async savePdfToS3(
    pdfBase64: string,
    requestId: number,
    sampleId: number,
    filename: string
  ): Promise<string> {
    try {
      // Convert base64 to buffer
      const buffer = Buffer.from(pdfBase64, 'base64');
      
      // Create S3 key following the pattern: tls/[env]/request/[requestid]/certificate/[request_sampleid]/filename
      const s3Key = `tls/${process.env.ENVNAME}/request/${requestId}/certificate/${sampleId}/${filename}`;
      
      // Upload to S3
      await this.s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: s3Key,
          Body: buffer,
          ContentType: 'application/pdf',
        }),
      );
      
      // Return the S3 path
      return `/${s3Key}`;
    } catch (error) {
      console.error('Error saving PDF to S3:', error);
      throw new Error(`Failed to save PDF to S3: ${error.message}`);
    }
  }
  




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
