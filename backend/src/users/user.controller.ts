import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthService} from "../auth/auth.service";
import {User} from "../../generated/prisma";

@Controller('users')
export class UsersController {
  constructor(
      private readonly usersService: UsersService,
      private readonly authService: AuthService) {}

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

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
