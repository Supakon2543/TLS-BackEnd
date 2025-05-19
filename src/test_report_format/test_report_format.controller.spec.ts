import { Test, TestingModule } from '@nestjs/testing';
import { TestReportFormatController } from './test_report_format.controller';
import { TestReportFormatService } from './test_report_format.service';

describe('TestReportFormatController', () => {
  let controller: TestReportFormatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestReportFormatController],
      providers: [TestReportFormatService],
    }).compile();

    controller = module.get<TestReportFormatController>(TestReportFormatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
