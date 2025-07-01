// src/bunker-tanker/bunker-tanker.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { BunkerTankerService } from './bunker-tanker.service';

@Controller('bunker-tanker')
export class BunkerTankerController {
    constructor(private readonly service: BunkerTankerService) {}

    @Post()
    async create(@Body() data: any) {
        const bunkerTanker = await this.service.create(data);
        return {
            ...bunkerTanker,
            id: bunkerTanker.id.toString(),
        }
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }
}
