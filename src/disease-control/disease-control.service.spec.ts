import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseControlService } from './disease-control.service';

describe('DiseaseControlService', () => {
  let service: DiseaseControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiseaseControlService],
    }).compile();

    service = module.get<DiseaseControlService>(DiseaseControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
