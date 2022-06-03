import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Org} from "./org.entity";
import {OrgService} from "./org.service";
import {OrgController} from "./org.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Org])],
    controllers: [OrgController],
    providers: [OrgService],
})
export class OrgModule {}
