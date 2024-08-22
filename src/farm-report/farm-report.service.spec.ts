import { Test, TestingModule } from '@nestjs/testing';
import { FarmReportService } from './farm-report.service';

describe('FarmReportService', () => {
  let service: FarmReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FarmReportService],
    }).compile();

    service = module.get<FarmReportService>(FarmReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
