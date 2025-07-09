import { Test, TestingModule } from '@nestjs/testing';
import { RequestDetailAttachmentService } from './request_detail_attachment.service';

describe('RequestDetailAttachmentService', () => {
  let service: RequestDetailAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestDetailAttachmentService],
    }).compile();

    service = module.get<RequestDetailAttachmentService>(RequestDetailAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
