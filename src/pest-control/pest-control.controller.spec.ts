import { Test, TestingModule } from '@nestjs/testing';
import { PestControlController } from './pest-control.controller';
import { PestControlService } from './pest-control.service';

describe('PestControlController', () => {
  let controller: PestControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PestControlController],
      providers: [PestControlService],
    }).compile();

    controller = module.get<PestControlController>(PestControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
