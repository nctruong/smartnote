import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateReceivingVesselDto} from "./dto/create-receiving-vessel.dto";
import {UpdateReceivingVesselDto} from "./dto/update-receiving-vessel.dto";

@Injectable()
export class ReceivingVesselService {
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreateReceivingVesselDto) {
        return this.prisma.receivingVessel.create({ data });
    }

    findAll() {
        return this.prisma.receivingVessel.findMany({
            include: { company: true, user: true },
        });
    }

    findOne(id: number) {
        return this.prisma.receivingVessel.findUnique({
            where: { id },
            include: { company: true, user: true },
        });
    }

    update(id: number, data: UpdateReceivingVesselDto) {
        return this.prisma.receivingVessel.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.receivingVessel.delete({ where: { id } });
    }
}
