import { Test, TestingModule } from '@nestjs/testing';
import { NpkPredictorController } from './npk-predictor.controller';
import { NpkPredictorService } from './npk-predictor.service';

describe('NpkPredictorController', () => {
  let controller: NpkPredictorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NpkPredictorController],
      providers: [NpkPredictorService],
    }).compile();

    controller = module.get<NpkPredictorController>(NpkPredictorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
