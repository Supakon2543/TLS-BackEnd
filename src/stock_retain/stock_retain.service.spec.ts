import { Test, TestingModule } from '@nestjs/testing';
import { StockRetainService } from './stock_retain.service';
import { PrismaService } from '../prisma/prisma.service';

describe('StockRetainService', () => {
  let service: StockRetainService;

  const mockPrismaService = {
    stock_retain: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      upsert: jest.fn(),
    },
    request_sample: {
      findMany: jest.fn(),
    },
    material: {
      findMany: jest.fn(),
    },
    location: {
      findMany: jest.fn(),
    },
    status_retain: {
      findMany: jest.fn(),
    },
    lab_site: {
      findMany: jest.fn(),
    },
    section: {
      findMany: jest.fn(),
    },
    box: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockRetainService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<StockRetainService>(StockRetainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list methods', () => {
    it('should list samples', async () => {
      const mockSamples = [
        {
          id: 1,
          sample_code: 'SMP-001',
          sample_name: 'Test Sample',
          material_code: 'MAT-001',
          batch_no: 'BATCH001',
          sampling_date: new Date(),
          expiry_date: new Date(),
          due_date: new Date(),
        },
      ];
      mockPrismaService.request_sample.findMany.mockResolvedValue(mockSamples);

      const result = await service.listSamples();

      expect(result).toEqual(mockSamples);
      expect(mockPrismaService.request_sample.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          sample_code: true,
          sample_name: true,
          material_code: true,
          batch_no: true,
          sampling_date: true,
          expiry_date: true,
          due_date: true,
        },
        orderBy: { sample_code: 'asc' },
      });
    });

    it('should list materials', async () => {
      const mockMaterials = [
        {
          id: 1,
          name: 'Test Material',
          test_report_name: 'Test Report',
          status: true,
        },
      ];
      mockPrismaService.material.findMany.mockResolvedValue(mockMaterials);

      const result = await service.listMaterials();

      expect(result).toEqual(mockMaterials);
      expect(mockPrismaService.material.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          test_report_name: true,
          status: true,
        },
        orderBy: { name: 'asc' },
      });
    });

    it('should list locations', async () => {
      const mockLocations = [
        {
          id: 1,
          name: 'Test Location',
          status: true,
        },
      ];
      mockPrismaService.location.findMany.mockResolvedValue(mockLocations);

      const result = await service.listLocations();

      expect(result).toEqual(mockLocations);
      expect(mockPrismaService.location.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          status: true,
        },
        orderBy: { name: 'asc' },
      });
    });

    it('should list status retain', async () => {
      const mockStatusRetain = [
        {
          id: 'SR01',
          name: 'Active',
        },
      ];
      mockPrismaService.status_retain.findMany.mockResolvedValue(mockStatusRetain);

      const result = await service.listStatusRetain();

      expect(result).toEqual(mockStatusRetain);
      expect(mockPrismaService.status_retain.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
        },
        orderBy: { id: 'asc' },
      });
    });

    it('should list lab sites', async () => {
      const mockLabSites = [
        {
          id: 'LS01',
          name: 'Main Lab',
          status: true,
        },
      ];
      mockPrismaService.lab_site.findMany.mockResolvedValue(mockLabSites);

      const result = await service.listLabSites();

      expect(result).toEqual(mockLabSites);
      expect(mockPrismaService.lab_site.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          status: true,
        },
        orderBy: { name: 'asc' },
      });
    });

    it('should list sections', async () => {
      const mockSections = [
        {
          id: 1,
          location_id: 1,
          name: 'Section A',
          number_of_box: 10,
          status: true,
          location: {
            name: 'Test Location',
          },
        },
      ];
      mockPrismaService.section.findMany.mockResolvedValue(mockSections);

      const result = await service.listSections();

      expect(result).toEqual(mockSections);
      expect(mockPrismaService.section.findMany).toHaveBeenCalledWith({
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
    });

    it('should list boxes', async () => {
      const mockBoxes = [
        {
          id: 1,
          location_id: 1,
          section_id: 1,
          name: 'Box 1',
          number_of_bottle: 50,
          status: true,
          location: {
            name: 'Test Location',
          },
          section: {
            name: 'Section A',
          },
        },
      ];
      mockPrismaService.box.findMany.mockResolvedValue(mockBoxes);

      const result = await service.listBoxes();

      expect(result).toEqual(mockBoxes);
      expect(mockPrismaService.box.findMany).toHaveBeenCalledWith({
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
    });
  });

  describe('getDropdownData', () => {
    it('should return all dropdown data in one call', async () => {
      const mockSamples = [{ id: 1, sample_code: 'SMP-001', sample_name: 'Test Sample' }];
      const mockMaterials = [{ id: 1, name: 'Test Material', status: true }];
      const mockLocations = [{ id: 1, name: 'Test Location', status: true }];
      const mockStatusRetain = [{ id: 'SR01', name: 'Active' }];
      const mockLabSites = [{ id: 'LS01', name: 'Main Lab', status: true }];
      const mockSections = [{ id: 1, name: 'Section A', status: true }];
      const mockBoxes = [{ id: 1, name: 'Box 1', status: true }];

      mockPrismaService.request_sample.findMany.mockResolvedValue(mockSamples);
      mockPrismaService.material.findMany.mockResolvedValue(mockMaterials);
      mockPrismaService.location.findMany.mockResolvedValue(mockLocations);
      mockPrismaService.status_retain.findMany.mockResolvedValue(mockStatusRetain);
      mockPrismaService.lab_site.findMany.mockResolvedValue(mockLabSites);
      mockPrismaService.section.findMany.mockResolvedValue(mockSections);
      mockPrismaService.box.findMany.mockResolvedValue(mockBoxes);

      const result = await service.getDropdownData();

      expect(result).toEqual({
        samples: mockSamples,
        materials: mockMaterials,
        locations: mockLocations,
        statusRetain: mockStatusRetain,
        labSites: mockLabSites,
        sections: mockSections,
        boxes: mockBoxes,
      });

      // Verify all methods were called
      expect(mockPrismaService.request_sample.findMany).toHaveBeenCalled();
      expect(mockPrismaService.material.findMany).toHaveBeenCalled();
      expect(mockPrismaService.location.findMany).toHaveBeenCalled();
      expect(mockPrismaService.status_retain.findMany).toHaveBeenCalled();
      expect(mockPrismaService.lab_site.findMany).toHaveBeenCalled();
      expect(mockPrismaService.section.findMany).toHaveBeenCalled();
      expect(mockPrismaService.box.findMany).toHaveBeenCalled();
    });
  });
});
