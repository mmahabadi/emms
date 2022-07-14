import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {Observable} from 'rxjs';
import {OrgService} from "./org.service";
import {Org} from "./org.entity";
import {ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('org')
@Controller('org')
export class OrgController {
    constructor(private orgService: OrgService) {}
    @Post()
    @ApiCreatedResponse({ description: 'The record has been successfully created.'})
    @ApiForbiddenResponse({ description: 'Forbidden.'})
    create(@Body() orgEntity: Org): Observable<Org> {
        return this.orgService.insertOrg(orgEntity);
    }
    @Get(':id')
    @ApiBody({ type: Org })
    get(@Param('id') id: string): Promise<Org> {
        return this.orgService.getOrg(id);
    }

    @Get('search/:id')
    search(@Query('q') q?: string): Promise<Org[]> {
      return this.orgService.search(q);
    }
}
