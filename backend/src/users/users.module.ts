import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './user.controller';
import { UsersService } from './users.service';
import {AuthService} from "../auth/auth.service";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AuthService],
})
export class UsersModule {}
