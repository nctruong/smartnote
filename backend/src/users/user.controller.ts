import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthService} from "../auth/auth.service";
import {$Enums, User} from "../../generated/prisma";
import {Roles} from "../auth/jwt/roles.decorator";
import {Role} from "../auth/jwt/roles.enum";

@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
      private readonly authService: AuthService) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.usersService.update(id, data);
  }

  @Post()
  async create(@Body() body: User) {
    const user = await this.authService.register(body.email, body.password, Number(body.companyId))
    const { email, password, companyId, ...rest } = body
    await this.usersService.update(Number(user.id), rest as User)
  }
}
