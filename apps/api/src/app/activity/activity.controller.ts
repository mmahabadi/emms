import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ActivityService} from "./activity.service";
import {Activity} from "./activity.entity";
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {Response} from "@emms/models";

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
    constructor(private activityService: ActivityService) {}
    @Post()
    create(@Body() activityEntity: Activity): Promise<Activity> {
        return this.activityService.insertActivity(activityEntity);
    }

    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: Activity,
    })
    @Get(':id')
    get(@Param('id') id: string): Promise<Activity> {
        return this.activityService.getActivity(id);
    }
  @Get('all/:id')
  getAll(@Param('id') id: string
    ,@Query('code') code?: string
    ,@Query('name') name?: string
    ,@Query('page') page?: number
    ,@Query('pagesize') pageSize?: number,
  ): Promise<Response<any[]>> {
    return this.activityService.
    getAllActivities(id, code, name, page, pageSize);
  }
}
