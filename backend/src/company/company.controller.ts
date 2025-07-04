// src/company/company.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    NotFoundException,
    ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {Company} from "../../generated/prisma";
import {Roles} from "../auth/jwt/roles.decorator";
import {RolesGuard} from "../auth/jwt/roles.guard";
import {Role} from "../auth/jwt/roles.enum";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Roles(Role.ADMIN)
    @Get()
    async findAll() {
        return this.companyService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const company = await this.companyService.findOne(id);
        if (!company) throw new NotFoundException('Company not found');
        return company;
    }

    @Post()
    async create(@Body() data: Company) {
        return this.companyService.create(data);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: { name?: string; uen?: string },
    ) {
        return this.companyService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.companyService.remove(id);
    }

}
