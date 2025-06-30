import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {JwtAuthGuard} from "./auth/jwt/jwt.guard";

@Controller()
export class AppController {
  private usersService: any;
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile() {
    return '<h1>Will Nguyen</h1>';
  }

}
