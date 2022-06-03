import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AssetIdentityController} from "./assetIdentity.controller";
import {AssetIdentityService} from "./assetIdentity.service";
import {AssetIdentity} from "./assetIdentity.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AssetIdentity])],
    controllers: [AssetIdentityController],
    providers: [AssetIdentityService],
})
export class AssetIdentityModule {}
