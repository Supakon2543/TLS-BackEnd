import { Test, TestingModule } from '@nestjs/testing';
import { CategoryEditService } from './category_edit.service';

describe('CategoryEditService', () => {
  let service: CategoryEditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryEditService],
    }).compile();

    service = module.get<CategoryEditService>(CategoryEditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
