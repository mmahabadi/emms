import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {JobRequest} from "./jobRequest.entity";
import {JobRequestController} from "./jobRequest.controller";
import {JobRequestService} from "./jobRequest.service";

@Module({
    imports: [TypeOrmModule.forFeature([JobRequest])],
    controllers: [JobRequestController],
    providers: [JobRequestService],
})
export class JobRequestModule {}
