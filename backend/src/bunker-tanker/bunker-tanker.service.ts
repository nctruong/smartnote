// src/bunker-tanker/bunker-tanker.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BunkerTankerService {
    constructor(private prisma: PrismaService) {}

    create(data: any) {
        return this.prisma.bunkerTanker.create({ data });
    }

    findAll() {
        return this.prisma.bunkerTanker.findMany();
    }

    findOne(id: number) {
        return this.prisma.bunkerTanker.findUnique({ where: { id } });
    }

    update(id: number, data: any) {
        return this.prisma.bunkerTanker.update({ where: { id }, data });
    }

    async remove(id: number) {
        const existing = await this.prisma.bunkerTanker.findUnique({ where: { id } });
        if (!existing) throw new NotFoundException('BunkerTanker not found');

        return this.prisma.bunkerTanker.delete({ where: { id } });
    }
}
