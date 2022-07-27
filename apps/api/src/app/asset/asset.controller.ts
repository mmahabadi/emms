import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {Observable} from 'rxjs';
import {AssetService} from "./asset.service";
import {Asset} from "./asset.entity";
import {ApiTags} from '@nestjs/swagger';

@ApiTags('asset')
@Controller('asset')
export class AssetController {
    constructor(private assetsService: AssetService) {}
    @Post()
    create(@Body() assetEntity: Asset): Observable<Asset> {
        return this.assetsService.insertAsset(assetEntity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<Asset> {
        return this.assetsService.getAsset(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string
           ,@Query('code') code?: string
           ,@Query('name') name?: string
           ,@Query('cat') assetCatId?: string
           ,@Query('location') locationId?: string
    ): Promise<Asset[]> {
        return this.assetsService.getAllAsset(id, code, name, assetCatId, locationId);
    }
    @Get('search/:id')
    search(
      @Param('id') id: string,
      @Query('q') q?: string
    ): Promise<Asset[]> {
        return this.assetsService.search(id, q);
    }
}
