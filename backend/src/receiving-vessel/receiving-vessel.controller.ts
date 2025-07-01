import {
    Controller, Get, Post, Body, Patch, Param, Delete
} from '@nestjs/common';
import { ReceivingVesselService } from './receiving-vessel.service';
import { CreateReceivingVesselDto } from './dto/create-receiving-vessel.dto';
import { UpdateReceivingVesselDto } from './dto/update-receiving-vessel.dto';

@Controller('receiving-vessels')
export class ReceivingVesselController {
    constructor(private readonly service: ReceivingVesselService) {}

    @Post()
    create(@Body() dto: CreateReceivingVesselDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(Number(id));
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateReceivingVesselDto) {
        return this.service.update(Number(id), dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(Number(id));
    }
}
