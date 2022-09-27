import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {Response} from "@emms/models";
import {JobOrderService} from "./jobOrder.service";
import {JobOrder} from "./jobOrder.entity";

@ApiTags('jobOrder')
@Controller('job_order')
export class JobOrderController {
    constructor(private service: JobOrderService) {}
    @Post()
    create(@Body() jobOrderEntity: JobOrder): Promise<JobOrder> {
        return this.service.insertJobOrder(jobOrderEntity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<JobOrder> {
        return this.service.getJobOrder(id);
    }
  @Get('all/:id')
  getAll(@Param('id') id: string
    ,@Query('page') page?: number
    ,@Query('pagesize') pageSize?: number,
  ): Promise<Response<any[]>> {
    return this.service.getAllJobOrder(id, page, pageSize);
  }
    @Get('search/:id')
    search(
      @Param('id') id: string,
      @Query('q') q?: string
    ): Promise<JobOrder[]> {
        return this.service.searchJobOrder(id, q);
    }
}
