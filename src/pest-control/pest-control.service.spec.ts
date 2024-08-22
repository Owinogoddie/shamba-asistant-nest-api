import { Test, TestingModule } from '@nestjs/testing';
import { PestControlService } from './pest-control.service';

describe('PestControlService', () => {
  let service: PestControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PestControlService],
    }).compile();

    service = module.get<PestControlService>(PestControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
