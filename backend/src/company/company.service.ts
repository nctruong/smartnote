import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {Company} from "../../generated/prisma";

@Injectable()
export class CompanyService {
  // company.service.ts
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const companies = await this.prisma.company.findMany({
      include: {
        parent: true,
      },
    });

    return companies.map((c) => ({
      ...c,
      id: c.id.toString(),
    }));
  }

  async findOne(id: number) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  async create(data: Company) {
    const company = await this.prisma.company.create({ data });
    return {
      ...company,
      id: company.id.toString(),
    };
  }

  async update(id: number, data: { name?: string; uen?: string }) {
    return this.prisma.company.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.$transaction(async (tran) => {
      await tran.bunkerTanker.deleteMany({ where: { companyId: id } });
      await tran.user.deleteMany({ where: { companyId: id } });
      return tran.company.delete({ where: { id } });
    });
  }
}
