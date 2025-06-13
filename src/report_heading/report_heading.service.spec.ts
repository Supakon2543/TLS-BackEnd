import { Test, TestingModule } from '@nestjs/testing';
import { ReportHeadingService } from './report_heading.service';

describe('ReportHeadingService', () => {
  let service: ReportHeadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportHeadingService],
    }).compile();

    service = module.get<ReportHeadingService>(ReportHeadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
