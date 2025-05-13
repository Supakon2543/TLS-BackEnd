import { Test, TestingModule } from '@nestjs/testing';
import { LabSiteService } from './lab_site.service';

describe('LabSiteService', () => {
  let service: LabSiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabSiteService],
    }).compile();

    service = module.get<LabSiteService>(LabSiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
