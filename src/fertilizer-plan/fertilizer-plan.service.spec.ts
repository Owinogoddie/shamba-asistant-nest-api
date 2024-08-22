import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerPlanService } from './fertilizer-plan.service';

describe('FertilizerPlanService', () => {
  let service: FertilizerPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FertilizerPlanService],
    }).compile();

    service = module.get<FertilizerPlanService>(FertilizerPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
