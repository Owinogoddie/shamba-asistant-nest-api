import { Test, TestingModule } from '@nestjs/testing';
import { NpkPredictorService } from './npk-predictor.service';

describe('NpkPredictorService', () => {
  let service: NpkPredictorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NpkPredictorService],
    }).compile();

    service = module.get<NpkPredictorService>(NpkPredictorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
