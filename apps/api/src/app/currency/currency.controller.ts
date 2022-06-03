import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { Observable } from 'rxjs';
import {CurrencyService} from "./currency.service";
import {Currency} from "./currency.entity";

import { ApiTags } from '@nestjs/swagger';

@ApiTags('currency')
@Controller('currency')
export class CurrencyController {
    constructor(private currencyService: CurrencyService) {}
    @Get(':id')
    get(@Param('id') id: number): Promise<Currency> {
        return this.currencyService.getCurrency(id);
    }
}
