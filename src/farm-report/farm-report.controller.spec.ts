import { Test, TestingModule } from '@nestjs/testing';
import { FarmReportController } from './farm-report.controller';
import { FarmReportService } from './farm-report.service';

describe('FarmReportController', () => {
  let controller: FarmReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmReportController],
      providers: [FarmReportService],
    }).compile();

    controller = module.get<FarmReportController>(FarmReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
