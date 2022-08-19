import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {ActivityService} from "./activity.service";
import {Activity} from "./activity.entity";
import {ApiResponse, ApiTags} from '@nestjs/swagger';

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
    getAll(@Param('id') id: string): Promise<Activity[]> {
        return this.activityService.getAllActivity(id);
    }
    @Get('search/:id')
    search(
      @Param('id') id: string,
      @Query('q') q?: string
    ): Promise<Activity[]> {
        return this.activityService.search(id, q);
    }
}
