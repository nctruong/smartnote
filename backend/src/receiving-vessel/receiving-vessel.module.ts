import { Module } from '@nestjs/common';
import { ReceivingVesselService } from './receiving-vessel.service';
import { ReceivingVesselController } from './receiving-vessel.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [ReceivingVesselController],
  providers: [ReceivingVesselService, PrismaService],
})
export class ReceivingVesselModule {}
