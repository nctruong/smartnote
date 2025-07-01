import { Module } from '@nestjs/common';
import { BunkerTankerService } from './bunker-tanker.service';
import { BunkerTankerController } from './bunker-tanker.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [BunkerTankerController],
  providers: [BunkerTankerService, PrismaService],
})
export class BunkerTankerModule {}
