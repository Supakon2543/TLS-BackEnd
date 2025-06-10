import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactInfoService } from './customer_contact_info.service';

describe('CustomerContactInfoService', () => {
  let service: CustomerContactInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerContactInfoService],
    }).compile();

    service = module.get<CustomerContactInfoService>(CustomerContactInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
