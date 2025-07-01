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
    ParseIntPipe,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import {Company} from "../../generated/prisma";

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

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
