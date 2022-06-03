import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { Observable } from 'rxjs';
import {AssetService} from "./asset.service";
import {Asset} from "./asset.entity";
import { ApiTags } from '@nestjs/swagger';

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
    getAll(@Param('id') id: string): Promise<Asset[]> {
        return this.assetsService.getAllAsset(id);
    }

}
