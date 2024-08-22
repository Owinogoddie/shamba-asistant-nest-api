import { Test, TestingModule } from '@nestjs/testing';
import { FertilizerPlanController } from './fertilizer-plan.controller';
import { FertilizerPlanService } from './fertilizer-plan.service';

describe('FertilizerPlanController', () => {
  let controller: FertilizerPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FertilizerPlanController],
      providers: [FertilizerPlanService],
    }).compile();

    controller = module.get<FertilizerPlanController>(FertilizerPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
