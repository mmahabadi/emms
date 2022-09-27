import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JobOrder} from "./jobOrder.entity";
import {JobOrderController} from "./jobOrder.controller";
import {JobOrderService} from "./jobOrder.service";

@Module({
    imports: [TypeOrmModule.forFeature([JobOrder])],
    controllers: [JobOrderController],
    providers: [JobOrderService],
})
export class JobOrderModule {}
