import { Test, TestingModule } from '@nestjs/testing';
import { DiseaseControlController } from './disease-control.controller';
import { DiseaseControlService } from './disease-control.service';

describe('DiseaseControlController', () => {
  let controller: DiseaseControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiseaseControlController],
      providers: [DiseaseControlService],
    }).compile();

    controller = module.get<DiseaseControlController>(DiseaseControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
