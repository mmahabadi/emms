import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {LocationService} from "./location.service";
import {Location} from "./location.entity";
import {ApiTags} from '@nestjs/swagger';

@ApiTags('location')
@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}
    @Post()
    create(@Body() locationEntity: Location): Promise<Location> {
        return this.locationService.insertLocation(locationEntity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<Location> {
        return this.locationService.getLocation(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string): Promise<Location[]> {
        return this.locationService.getAllLocation(id);
    }
    @Get('search/:id')
    search(
      @Param('id') id: string,
      @Query('q') q?: string
    ): Promise<Location[]> {
        return this.locationService.search(id, q);
    }
    @Get('tree/:id')
    tree(
      @Param('id') id: string,
      @Query('q') q?: string
    ): Promise<Location[]> {
        return this.locationService.tree(id, q);
    }
}
