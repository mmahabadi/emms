import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {DamageService} from "./damage.service";
import { ApiTags } from '@nestjs/swagger';
import {Response} from "@emms/models";
import {Damage} from "./damage.entity";

@ApiTags('damage')
@Controller('damage')
export class DamageController {
    constructor(private service: DamageService) {}
    @Post()
    create(@Body() entity: Damage): Promise<Damage> {
        return this.service.insertDamage(entity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<Damage> {
        return this.service.getDamage(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string
      ,@Query('code') code?: string
      ,@Query('name') name?: string
      ,@Query('page') page?: number
      ,@Query('pagesize') pageSize?: number,
): Promise<Response<any[]>> {
        return this.service.
        getAllDamage(id, code, name, page, pageSize);
    }

    @Get('search/:id')
    searchDamage(@Param('id') id: string
      ,@Query('q') q?: string
): Promise<Damage[]> {
        return this.service.searchDamage(id, q);
    }
}
