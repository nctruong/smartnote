import { Test, TestingModule } from '@nestjs/testing';
import { BunkerTankerService } from './bunker-tanker.service';

describe('BunkerTankerService', () => {
  let service: BunkerTankerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BunkerTankerService],
    }).compile();

    service = module.get<BunkerTankerService>(BunkerTankerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
