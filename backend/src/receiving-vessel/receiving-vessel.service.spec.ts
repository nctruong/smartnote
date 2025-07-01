import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingVesselService } from './receiving-vessel.service';

describe('ReceivingVesselService', () => {
  let service: ReceivingVesselService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceivingVesselService],
    }).compile();

    service = module.get<ReceivingVesselService>(ReceivingVesselService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
