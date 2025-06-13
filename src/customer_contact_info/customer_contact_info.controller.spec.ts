import { Test, TestingModule } from '@nestjs/testing';
import { CustomerContactInfoController } from './customer_contact_info.controller';
import { CustomerContactInfoService } from './customer_contact_info.service';

describe('CustomerContactInfoController', () => {
  let controller: CustomerContactInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerContactInfoController],
      providers: [CustomerContactInfoService],
    }).compile();

    controller = module.get<CustomerContactInfoController>(CustomerContactInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
