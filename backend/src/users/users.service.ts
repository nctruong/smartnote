import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../generated/prisma'; // ✅ import correct type

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async remove(id: number) {
    const existing = await this.prisma.user.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('User not found');

    return this.prisma.user.delete({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        company: true,
        bunkerTankers: true,
        receivingVessels: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
        where: { id } ,
        select: {
          id: true,
          email: true,
          role: true,
          company: true,
          bunkerTankers: true
        }
    });

    if (!user) throw new NotFoundException('User not found');

    // @ts-ignore
    return user
  }

  async update(id: number, data: User) {
    const user = this.prisma.user.update({ where: {id: id}, data})
    if (!user) throw new NotFoundException('User not found');

    return user
  }
}
