import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AssetIdentity} from "./assetIdentity.entity";
import {AssetIdentityService} from "./assetIdentity.service";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('assetIdentity')
@Controller('assetIdentity')
export class AssetIdentityController {
    constructor(private service: AssetIdentityService) {}
    @Post()
    create(@Body() entity: AssetIdentity): Promise<AssetIdentity> {
        return this.service.insertAssetIdentity(entity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<AssetIdentity> {
        return this.service.getAssetIdentity(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string): Promise<AssetIdentity[]> {
        return this.service.getAllAssetIdentity(id);
    }
}
