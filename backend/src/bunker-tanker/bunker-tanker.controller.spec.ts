import { Test, TestingModule } from '@nestjs/testing';
import { BunkerTankerController } from './bunker-tanker.controller';

describe('BunkerTankerController', () => {
  let controller: BunkerTankerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BunkerTankerController],
    }).compile();

    controller = module.get<BunkerTankerController>(BunkerTankerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
