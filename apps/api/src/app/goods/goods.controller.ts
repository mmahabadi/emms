import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {Goods} from "./goods.entity";
import {GoodsService} from "./goods.service";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('goods')
@Controller('goods')
export class GoodsController {
    constructor(private service: GoodsService) {}
    @Post()
    create(@Body() entity: Goods): Promise<Goods> {
        return this.service.insertGoods(entity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<Goods> {
        return this.service.getGoods(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string
      ,@Query('code') code?: string
      ,@Query('name') name?: string): Promise<Goods[]> {
        return this.service.getAllGoods(id, code, name);
    }
}
