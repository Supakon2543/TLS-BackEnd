import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockRetainDto } from './dto/create-stock_retain.dto';
import { UpdateStockRetainDto } from './dto/update-stock_retain.dto';
import { FilterRequestSamplesDto } from './dto/filter-request-samples.dto';

@Injectable()
export class StockRetainService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdate(data: CreateStockRetainDto) {
    if (data.id === null || data.id === undefined || data.id === 0) {
      const { id, created_on, updated_on, ...createData } = data;
      return this.prisma.stock_retain.create({ data: createData });
    }
    return this.prisma.stock_retain.upsert({
      where: { id: data.id },
      create: { ...data },
      update: data,
    });
  }

  async create(data: CreateStockRetainDto) {
    return this.prisma.stock_retain.create({ data });
  }

  async findAll() {
    return this.prisma.stock_retain.findMany();
  }

  async findOne(id: number) {
    // Add validation to ensure id is valid
    if (!id || isNaN(id) || id <= 0) {
      throw new NotFoundException(`Invalid StockRetain ID: ${id}`);
    }

    const stockRetain = await this.prisma.stock_retain.findUnique({
      where: {
        id: id,
      },
    });

    if (!stockRetain) {
      throw new NotFoundException(`StockRetain ID ${id} not found`);
    }

    return stockRetain;
  }

  async update(id: number, data: UpdateStockRetainDto) {
    await this.findOne(id);
    return this.prisma.stock_retain.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.stock_retain.delete({ where: { id } });
  }

  // List methods for related entities
  async listSamples() {
    return this.prisma.request_sample.findMany({
      select: {
        id: true,
        sample_code: true,
        sample_name: true,
      },
      orderBy: { sample_code: 'asc' },
    });
  }

  async listMaterials() {
    return this.prisma.material.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async listLocations() {
    return this.prisma.location.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async listStatusRetain() {
    return this.prisma.status_retain.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  async listLabSites() {
    return this.prisma.lab_site.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async listSections() {
    return this.prisma.section.findMany({
      select: {
        id: true,
        location_id: true,
        name: true,
        number_of_box: true,
        status: true,
        location: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async listBoxes() {
    return this.prisma.box.findMany({
      select: {
        id: true,
        location_id: true,
        section_id: true,
        name: true,
        number_of_bottle: true,
        status: true,
        location: {
          select: {
            name: true,
          },
        },
        section: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async getDropdownData() {
    const [samples, materials, locations, status_retain, lab_site] =
      await Promise.all([
        this.listSamples(),
        this.listMaterials(),
        this.listLocations(),
        this.listStatusRetain(),
        this.listLabSites(),
      ]);

    return {
      samples,
      materials,
      locations,
      status_retain,
      lab_site,
    };
  }
  async getRequestSamples(filters?: FilterRequestSamplesDto) {
    // Build where clause for stock_retain
    const stockRetainWhere: any = {};

    // Location filter - ensure IDs are converted to proper type
    if (filters?.location && filters.location.length > 0) {
      stockRetainWhere.location_id = {
        in: filters.location.map((l) => Number(l.id)), // Ensure it's a number
      };
    }

    // Build where clause for request_sample
    const requestSampleWhere: any = {};

    // Sample name filter
    if (filters?.sample && filters.sample.length > 0) {
      requestSampleWhere.sample_name = {
        in: filters.sample.map((s) => s.name),
      };
    }

    // Material code filter
    if (filters?.material_code && filters.material_code.length > 0) {
      requestSampleWhere.material_code = {
        in: filters.material_code.map((mc) => mc.code),
      };
    }

    // Status filter - check if this should be String or Int
    if (filters?.status && filters.status.length > 0) {
      requestSampleWhere.status_sample_id = {
        in: filters.status.map((s) => s.id), // Keep as string if status IDs are strings
      };
    }

    // Date filters for request_sample
    if (
      filters?.received_date &&
      (filters.received_date.start || filters.received_date.end)
    ) {
      requestSampleWhere.created_on = {};
      if (filters.received_date.start) {
        requestSampleWhere.created_on.gte = new Date(
          filters.received_date.start,
        );
      }
      if (filters.received_date.end) {
        requestSampleWhere.created_on.lte = new Date(filters.received_date.end);
      }
    }

    if (filters?.mfg_date && (filters.mfg_date.start || filters.mfg_date.end)) {
      requestSampleWhere.sampling_date = {};
      if (filters.mfg_date.start) {
        requestSampleWhere.sampling_date.gte = new Date(filters.mfg_date.start);
      }
      if (filters.mfg_date.end) {
        requestSampleWhere.sampling_date.lte = new Date(filters.mfg_date.end);
      }
    }

    if (
      filters?.expiry_date &&
      (filters.expiry_date.start || filters.expiry_date.end)
    ) {
      requestSampleWhere.expiry_date = {};
      if (filters.expiry_date.start) {
        requestSampleWhere.expiry_date.gte = new Date(
          filters.expiry_date.start,
        );
      }
      if (filters.expiry_date.end) {
        requestSampleWhere.expiry_date.lte = new Date(filters.expiry_date.end);
      }
    }

    // Lab filter - ensure IDs are converted to proper type
    if (filters?.lab && filters.lab.length > 0) {
      requestSampleWhere.request = {
        lab_site_id: {
          in: filters.lab.map((l) => l.id), // Keep original type
        },
      };
    }

    // Keyword search across multiple fields
    if (filters?.keyword && filters.keyword.trim() !== '') {
      const keywordConditions = [
        { sample_code: { contains: filters.keyword, mode: 'insensitive' } },
        { sample_name: { contains: filters.keyword, mode: 'insensitive' } },
        { material_code: { contains: filters.keyword, mode: 'insensitive' } },
        { batch_no: { contains: filters.keyword, mode: 'insensitive' } },
        {
          material: {
            name: { contains: filters.keyword, mode: 'insensitive' },
          },
        },
      ];

      requestSampleWhere.OR = keywordConditions;
    }

    // Apply filters to the main query only if there are conditions
    if (Object.keys(requestSampleWhere).length > 0) {
      stockRetainWhere.request_sample = requestSampleWhere;
    }

    const stockRetains = await this.prisma.stock_retain.findMany({
      where:
        Object.keys(stockRetainWhere).length > 0 ? stockRetainWhere : undefined,
      select: {
        id: true,
        created_on: true,
        location: {
          select: {
            name: true,
          },
        },
        request_sample: {
          select: {
            id: true,
            request_id: true,
            sample_code: true,
            sample_name: true,
            material_code: true,
            batch_no: true,
            sampling_date: true,
            expiry_date: true,
            created_on: true,
            material: {
              select: {
                name: true,
              },
            },
            status_sample: {
              select: {
                id: true,
                name: true,
              },
            },
            request: {
              select: {
                id: true,
                lab_site_id: true,
                lab_site: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        created_on: 'desc',
      },
    });

    // Get item counts separately
    const stockRetainIds = stockRetains.map((sr) => sr.id);
    const itemCounts =
      stockRetainIds.length > 0
        ? await this.prisma.stock_retain_item.groupBy({
            by: ['stock_retain_id'],
            where: {
              stock_retain_id: { in: stockRetainIds },
            },
            _count: {
              id: true,
            },
          })
        : [];

    return stockRetains.map((stockRetain) => {
      const sample = stockRetain.request_sample;
      const itemCount =
        itemCounts.find((ic) => ic.stock_retain_id === stockRetain.id)?._count
          .id || 0;

      return {
        sample_id: sample?.id,
        sample_code: sample?.sample_code,
        sample_name: sample?.sample_name,
        material_code: sample?.material_code,
        material_name: sample?.material?.name,
        batch_no: sample?.batch_no,
        received_date: sample?.created_on,
        location_name: stockRetain.location?.name,
        mfg_date: sample?.sampling_date,
        expiry_date: sample?.expiry_date,
        amount: itemCount,
        status_id: sample?.status_sample?.id || null,
        status_name: sample?.status_sample?.name || null,
        lab_id: sample?.request?.lab_site_id,
        lab_name: sample?.request?.lab_site?.name,
      };
    });
  }

  async getRequestSampleById(sampleId: number) {
    // Get the request sample with basic info
    const requestSample = await this.prisma.request_sample.findUnique({
      where: { id: sampleId },
      include: {
        material: {
          select: {
            id: true,
            name: true,
          },
        },
        status_sample: {
          select: {
            id: true,
            name: true,
          },
        },
        request: {
          select: {
            id: true,
            request_number: true,
            lab_site_id: true,
            lab_site: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!requestSample) {
      throw new NotFoundException(
        `Request Sample with ID ${sampleId} not found`,
      );
    }

    // Get stock_retain records for this sample
    const stockRetains = await this.prisma.stock_retain.findMany({
      where: { request_sample_id: sampleId },
      include: {
        location: true,
        section: true,
        box: true,
      },
    });

    // Get request_sample_item data from request_sample_item table
    const requestSampleItems = await this.prisma.request_sample_item.findMany({
      where: {
        request_sample_id: sampleId,
      },
      include: {
        unit: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        seq: 'asc',
      },
    });

    // Get stock_retain_item data for activity logs
    const stockRetainIds = stockRetains.map((sr) => sr.id);
    const stockRetainItems =
      stockRetainIds.length > 0
        ? await this.prisma.stock_retain_item.findMany({
            where: {
              stock_retain_id: { in: stockRetainIds },
            },
          })
        : [];

    // ✅ Combine request_sample_item and stock_retain_item data
    const combinedItems = requestSampleItems.map((requestItem) => {
      // Find matching stock_retain_items for this request_sample_item
      const matchingStockItems = stockRetainItems.filter(
        (stockItem) => stockItem.id === requestItem.request_sample_id,
      );

      return {
        // request_sample_item data
        request_sample_item: {
          id: requestItem.id,
          seq: requestItem.seq,
          quantity: requestItem.quantity,
          unit_name: requestItem.unit?.name,
          time: requestItem.time,
        },
        // stock_retain_item data (array of matching items)
        stock_retain_item: matchingStockItems.map((stockItem) => ({
          id: stockItem.id,
          stock_retain_id: stockItem.stock_retain_id,
          sample_item_id: stockItem.sample_item_id,
          status_retain_id: stockItem.status_retain_id,
          approve_role_id: stockItem.approve_role_id,
          plan_return_date: stockItem.plan_return_date,
          return_date: stockItem.return_date,
          created_by: stockItem.created_by,
          updated_by: stockItem.updated_by,
        })),
      };
    });

    // Get unique location, section, and box IDs for calculations
    const locationIds = [...new Set(stockRetains.map((sr) => sr.location_id))];
    const sectionIds = [...new Set(stockRetains.map((sr) => sr.section_id))];
    const boxIds = [...new Set(stockRetains.map((sr) => sr.box_id))];

    // Calculate location data with bottle counts
    const locations = await Promise.all(
      locationIds.map(async (locationId) => {
        const location = await this.prisma.location.findUnique({
          where: { id: locationId },
        });

        // Sum number_of_bottle from sections in this location
        const sectionsInLocation = await this.prisma.section.findMany({
          where: { location_id: locationId },
          select: { number_of_box: true },
        });

        const totalBottlesFromSections = sectionsInLocation.reduce(
          (sum, section) => sum + (section.number_of_box || 0),
          0,
        );

        // Count stock_retain_items in this location
        const bottleUseCount = await this.prisma.stock_retain_item.count({
          where: {
            stock_retain: {
              location_id: locationId,
            },
          },
        });

        return {
          id: location?.id,
          name: location?.name,
          number_of_bottle: totalBottlesFromSections,
          bottle_use: bottleUseCount,
        };
      }),
    );

    // Calculate section data with bottle counts
    const sections = await Promise.all(
      sectionIds.map(async (sectionId) => {
        const section = await this.prisma.section.findUnique({
          where: { id: sectionId },
        });

        // Count stock_retain_items in this section
        const bottleUseCount = await this.prisma.stock_retain_item.count({
          where: {
            stock_retain: {
              section_id: sectionId,
            },
          },
        });

        return {
          id: section?.id,
          location_id: section?.location_id || null,
          name: section?.name,
          number_of_bottle: section?.number_of_box || 0,
          bottle_use: bottleUseCount,
        };
      }),
    );

    // Calculate box data with bottle counts
    const boxes = await Promise.all(
      boxIds.map(async (boxId) => {
        const box = await this.prisma.box.findUnique({
          where: { id: boxId },
        });

        // Count stock_retain_items in this box
        const bottleUseCount = await this.prisma.stock_retain_item.count({
          where: {
            stock_retain: {
              box_id: boxId,
            },
          },
        });

        return {
          id: box?.id,
          location_id: box?.location_id || null,
          section_id: box?.section_id || null,
          name: box?.name,
          number_of_bottle: box?.number_of_bottle || 0,
          bottle_use: bottleUseCount,
        };
      }),
    );

    // Get activity logs from stock_retain_item_log table
    const activityLogs =
      stockRetainItems.length > 0
        ? await this.prisma.stock_retain_item_log.findMany({
            where: {
              stock_retain_item_id: {
                in: stockRetainItems.map((item) => item.id),
              },
            },
            include: {
              activity_retain: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            orderBy: {
              timestamp: 'desc',
            },
          })
        : [];

    return {
      stock_retain:
        stockRetains.length > 0
          ? {
              id: stockRetains[0].id,
              request_sample_id: stockRetains[0].request_sample_id,
              location_id: stockRetains[0].location_id,
              section_id: stockRetains[0].section_id,
              box_id: stockRetains[0].box_id,
              status_retain_id: stockRetains[0].status_retain_id,
              created_by: stockRetains[0].created_by,
              updated_by: stockRetains[0].updated_by,
            }
          : null,
      request_sample: {
        sample_id: requestSample.id,
        sample_code: requestSample.sample_code,
        sample_name: requestSample.sample_name,
        material_code: requestSample.material_code,
        material_name: requestSample.material?.name,
        batch_no: requestSample.batch_no,
        mfg_date: requestSample.sampling_date,
        expiry_date: requestSample.expiry_date,
        request_no: requestSample.request?.request_number,
      },
      // ✅ Updated to include combined request_sample_item and stock_retain_item data
      sample_item: combinedItems,
      location: locations,
      section: sections,
      box: boxes,
      activity_log: activityLogs.map((log) => ({
        id: log.id,
        stock_retain_item_id: log.stock_retain_item_id,
        stock_retain_id: log.stock_retain_id,
        activity: log.activity,
        user_id: log.user_id,
        timestamp: log.timestamp,
        remark: log.remark,
      })),
    };
  }

  async getRequestSampleDetails(sampleIds: number[], isSelect?: boolean) {
    // Validate input
    if (!sampleIds || sampleIds.length === 0) {
      throw new NotFoundException('Sample IDs array cannot be empty');
    }

    const requestSamples = await this.prisma.request_sample.findMany({
      where: {
        id: {
          in: sampleIds,
        },
      },
      include: {
        material: {
          select: {
            id: true,
            name: true,
          },
        },
        status_sample: {
          select: {
            id: true,
            name: true,
          },
        },
        request: {
          select: {
            id: true,
            request_number: true,
            lab_site_id: true,
            lab_site: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!requestSamples || requestSamples.length === 0) {
      throw new NotFoundException(
        `Request Samples with IDs ${sampleIds.join(', ')} not found`,
      );
    }

    // Get stock_retain records for these samples
    const stockRetains = await this.prisma.stock_retain.findMany({
      where: {
        request_sample_id: {
          in: sampleIds,
        },
      },
      include: {
        location: true,
        section: true,
        box: true,
      },
    });

    // Get request_sample_item data
    const requestSampleItems = await this.prisma.request_sample_item.findMany({
      where: {
        request_sample_id: {
          in: sampleIds,
        },
      },
      select: {
        id: true,
        seq: true,
        quantity: true,
        time: true,
        request_sample_id: true,
        unit: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        seq: 'asc',
      },
    });

    // Get stock_retain_item data
    const stockRetainIds = stockRetains.map((sr) => sr.id);
    const stockRetainItems =
      stockRetainIds.length > 0
        ? await this.prisma.stock_retain_item.findMany({
            where: {
              stock_retain_id: { in: stockRetainIds },
            },
          })
        : [];

    // ✅ Build sample_item array without location, section, box arrays
    const sampleItemArray: any[] = [];

    requestSampleItems.forEach((requestItem) => {
      // Find the corresponding request sample
      const requestSample = requestSamples.find(
        (rs) => rs.id === requestItem.request_sample_id,
      );

      // Find the corresponding stock retain
      const stockRetain = stockRetains.find(
        (sr) => sr.request_sample_id === requestItem.request_sample_id,
      );

      // Find matching stock_retain_items for this request_sample_item
      const matchingStockItems = stockRetainItems.filter(
        (stockItem) => stockItem.sample_item_id === requestItem.id,
      );

      // Create an entry for each stock_retain_item or one entry if no stock items
      if (matchingStockItems.length > 0) {
        matchingStockItems.forEach((stockItem) => {
          const itemData: any = {
            // ✅ request_sample_item nested object
            request_sample_item: {
              id: requestItem.id,
              request_sample_id: requestItem.request_sample_id,
              sample_code: requestSample?.sample_code,
              material_code: requestSample?.material_code,
              material_name: requestSample?.material?.name,
              batch_no: requestSample?.batch_no,
              mfg_date: requestSample?.sampling_date,
              seq: requestItem.seq,
              quantity: requestItem.quantity,
              unit_name: requestItem.unit?.name,
              time: requestItem.time,
            },
            // ✅ stock_retain nested object
            stock_retain: {
              id: stockRetain?.id,
              request_sample_id: stockRetain?.request_sample_id,
              location_id: stockRetain?.location_id,
              location_name: stockRetain?.location?.name,
              section_id: stockRetain?.section_id,
              section_name: stockRetain?.section?.name,
              box_id: stockRetain?.box_id,
              box_name: stockRetain?.box?.name,
              status_retain_id: stockRetain?.status_retain_id,
              created_by: stockRetain?.created_by,
              updated_by: stockRetain?.updated_by,
            },
            // ✅ stock_retain_item nested object
            stock_retain_item: {
              id: stockItem.id,
              stock_retain_id: stockItem.stock_retain_id,
              sample_item_id: stockItem.sample_item_id,
              status_retain_id: stockItem.status_retain_id,
              approve_role_id: stockItem.approve_role_id,
              plan_return_date: stockItem.plan_return_date,
              return_date: stockItem.return_date,
              created_by: stockItem.created_by,
              updated_by: stockItem.updated_by,
            },
          };

          sampleItemArray.push(itemData);
        });
      } else {
        // If no stock items, still include the request sample item
        const itemData: any = {
          // ✅ request_sample_item nested object
          request_sample_item: {
            id: requestItem.id,
            request_sample_id: requestItem.request_sample_id,
            sample_code: requestSample?.sample_code,
            material_code: requestSample?.material_code,
            material_name: requestSample?.material?.name,
            batch_no: requestSample?.batch_no,
            mfg_date: requestSample?.sampling_date,
            seq: requestItem.seq,
            quantity: requestItem.quantity,
            unit_name: requestItem.unit?.name,
            time: requestItem.time,
          },
          // ✅ stock_retain nested object (with null/empty values)
          stock_retain: {
            id: stockRetain?.id || null,
            request_sample_id: stockRetain?.request_sample_id || null,
            location_id: stockRetain?.location_id || null,
            location_name: stockRetain?.location?.name || null,
            section_id: stockRetain?.section_id || null,
            section_name: stockRetain?.section?.name || null,
            box_id: stockRetain?.box_id || null,
            box_name: stockRetain?.box?.name || null,
            status_retain_id: stockRetain?.status_retain_id || null,
            created_by: stockRetain?.created_by || null,
            updated_by: stockRetain?.updated_by || null,
          },
          // ✅ stock_retain_item nested object (empty)
          stock_retain_item: {
            id: null,
            stock_retain_id: null,
            sample_item_id: null,
            status_retain_id: null,
            approve_role_id: null,
            plan_return_date: null,
            return_date: null,
            created_by: null,
            updated_by: null,
          },
        };

        sampleItemArray.push(itemData);
      }
    });

    // ✅ Build response object
    const response: any = {
      sample_item: sampleItemArray,
    };

    // ✅ Conditionally add separate location, section, box arrays based on isSelect parameter
    if (isSelect === true) {
      // Get unique location, section, and box IDs
      const locationIds = [
        ...new Set(stockRetains.map((sr) => sr.location_id)),
      ];
      const sectionIds = [...new Set(stockRetains.map((sr) => sr.section_id))];
      const boxIds = [...new Set(stockRetains.map((sr) => sr.box_id))];

      // ✅ Build separate location array
      const locations = await Promise.all(
        locationIds.map(async (locationId) => {
          const location = await this.prisma.location.findUnique({
            where: { id: locationId },
          });

          // Count stock_retain_items in this location
          const bottleUseCount = await this.prisma.stock_retain_item.count({
            where: {
              stock_retain: {
                location_id: locationId,
              },
            },
          });

          // Sum number_of_bottle from sections in this location
          const sectionsInLocation = await this.prisma.section.findMany({
            where: { location_id: locationId },
            select: { number_of_box: true },
          });

          const totalBottlesFromSections = sectionsInLocation.reduce(
            (sum, section) => sum + (section.number_of_box || 0),
            0,
          );

          return {
            id: location?.id,
            name: location?.name,
            number_of_bottle: totalBottlesFromSections,
            bottle_use: bottleUseCount,
          };
        }),
      );

      // ✅ Build separate section array
      const sections = await Promise.all(
        sectionIds.map(async (sectionId) => {
          const section = await this.prisma.section.findUnique({
            where: { id: sectionId },
          });

          // Count stock_retain_items in this section
          const bottleUseCount = await this.prisma.stock_retain_item.count({
            where: {
              stock_retain: {
                section_id: sectionId,
              },
            },
          });

          return {
            id: section?.id,
            location_id: section?.location_id,
            name: section?.name,
            number_of_bottle: section?.number_of_box || 0,
            bottle_use: bottleUseCount,
          };
        }),
      );

      // ✅ Build separate box array
      const boxes = await Promise.all(
        boxIds.map(async (boxId) => {
          const box = await this.prisma.box.findUnique({
            where: { id: boxId },
          });

          // Count stock_retain_items in this box
          const bottleUseCount = await this.prisma.stock_retain_item.count({
            where: {
              stock_retain: {
                box_id: boxId,
              },
            },
          });

          return {
            id: box?.id,
            location_id: box?.location_id,
            section_id: box?.section_id,
            name: box?.name,
            number_of_bottle: box?.number_of_bottle || 0,
            bottle_use: bottleUseCount,
          };
        }),
      );

      // Add separate arrays to response
      response.location = locations;
      response.section = sections;
      response.box = boxes;
    }

    return response;
  }
}
