import { Test, TestingModule } from '@nestjs/testing';
import { TestReportFormatService } from './test_report_format.service';

describe('TestReportFormatService', () => {
  let service: TestReportFormatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestReportFormatService],
    }).compile();

    service = module.get<TestReportFormatService>(TestReportFormatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
