import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { BunkerTankerModule } from './bunker-tanker/bunker-tanker.module';
import { ReceivingVesselModule } from './receiving-vessel/receiving-vessel.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, CompanyModule, BunkerTankerModule, ReceivingVesselModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
