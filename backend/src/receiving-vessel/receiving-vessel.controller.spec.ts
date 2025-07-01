import { Test, TestingModule } from '@nestjs/testing';
import { ReceivingVesselController } from './receiving-vessel.controller';

describe('ReceivingVesselController', () => {
  let controller: ReceivingVesselController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceivingVesselController],
    }).compile();

    controller = module.get<ReceivingVesselController>(ReceivingVesselController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
