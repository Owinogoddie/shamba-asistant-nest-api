import { Test, TestingModule } from '@nestjs/testing';
import { SoilCorrectionService } from './soil-correction.service';

describe('SoilCorrectionService', () => {
  let service: SoilCorrectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoilCorrectionService],
    }).compile();

    service = module.get<SoilCorrectionService>(SoilCorrectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
