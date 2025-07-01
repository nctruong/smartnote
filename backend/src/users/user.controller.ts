import {Body, Controller, Delete, Get, Param, Put} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
