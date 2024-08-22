import { Test, TestingModule } from '@nestjs/testing';
import { SoilCorrectionController } from './soil-correction.controller';
import { SoilCorrectionService } from './soil-correction.service';

describe('SoilCorrectionController', () => {
  let controller: SoilCorrectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoilCorrectionController],
      providers: [SoilCorrectionService],
    }).compile();

    controller = module.get<SoilCorrectionController>(SoilCorrectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
