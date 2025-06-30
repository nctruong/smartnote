import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from '../users.service';

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
}
