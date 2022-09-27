import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Response} from "@emms/models";
import {JobRequestService} from "./jobRequest.service";
import {JobRequest} from "./jobRequest.entity";

@ApiTags('jobRequest')
@Controller('job_request')
export class JobRequestController {
    constructor(private service: JobRequestService) {}
    @Post()
    create(@Body() jobRequestEntity: JobRequest): Promise<JobRequest> {
        return this.service.insertJobRequest(jobRequestEntity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<JobRequest> {
        return this.service.getJobRequest(id);
    }
  @Get('all/:id')
  getAll(@Param('id') id: string
    ,@Query('page') page?: number
    ,@Query('pagesize') pageSize?: number,
  ): Promise<Response<any[]>> {
    return this.service.getAllJobRequest(id, page, pageSize);
  }
    @Get('search/:id')
    search(
      @Param('id') id: string,
      @Query('q') q?: string
    ): Promise<JobRequest[]> {
        return this.service.searchJobRequest(id, q);
    }
}
