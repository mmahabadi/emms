import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AssetCat} from "./assetCat.entity";
import {AssetCatsService} from "./assetCats.service";
import {AssetCatController} from "./assetCats.controller";

@Module({
    imports: [TypeOrmModule.forFeature([AssetCat])],
    controllers: [AssetCatController],
    providers: [AssetCatsService],
})
export class AssetCatsModule {}
