import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  imports: [],
  providers: [CompanyService, PrismaService],
  controllers: [CompanyController]
})
export class CompanyModule {}
