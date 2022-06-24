import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AssetCatsService} from "./assetCats.service";
import {AssetCat} from "./assetCat.entity";
import {ApiTags} from '@nestjs/swagger';
import {Response} from "@emms/models";

@ApiTags('assetCat')
@Controller('assetCat')
export class AssetCatController {
    constructor(private assetCatsService: AssetCatsService) {}
    @Post()
    create(@Body() assetCatEntity: AssetCat): Observable<AssetCat> {
        return this.assetCatsService.insertAssetCat(assetCatEntity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<AssetCat> {
        return this.assetCatsService.getAssetCat(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string): Promise<AssetCat[]> {
        return this.assetCatsService.getAllAssetCat(id);
    }

    @Get('all/paging/:id')
    getAllWithPaging(
      @Param('id') id: string,
      @Query('page') page?: number,
      @Query('pagesize') pageSize?: number,
    ): Promise<Response<any[]>> {
        return this.assetCatsService.getAllAssetCatWithPaging(id, page, pageSize);
    }

}
