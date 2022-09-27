import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DamageService} from "./damage.service";
import {DamageController} from "./damage.controller";
import {Damage} from "../damage/damage.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Damage])],
    controllers: [DamageController],
    providers: [DamageService],
})
export class DamageModule {}
