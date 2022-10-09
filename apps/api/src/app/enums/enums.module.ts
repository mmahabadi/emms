import { Module } from '@nestjs/common';
import {EnumsController} from "./enum.controller";
import {EnumsService} from "./enums.service";

@Module({
    controllers: [EnumsController],
    providers: [EnumsService],
})
export class EnumsModule {}
