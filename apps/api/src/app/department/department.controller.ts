import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';
import {Department} from "./department.entity";
import {DepartmentService} from "./department.service";
import { ApiTags } from '@nestjs/swagger';
import {Response} from "@emms/models";

@ApiTags('department')
@Controller('department')
export class DepartmentController {
    constructor(private service: DepartmentService) {}
    @Post()
    create(@Body() entity: Department): Promise<Department> {
        return this.service.insertDepartment(entity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<Department> {
        return this.service.getDepartment(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string
      ,@Query('code') code?: string
      ,@Query('name') name?: string
      ,@Query('page') page?: number
      ,@Query('pagesize') pageSize?: number,
): Promise<Response<any[]>> {
        return this.service.
        getAllDepartment(id, code, name, page, pageSize);
    }

    @Get('search/:id')
    searchGoods(@Param('id') id: string
      ,@Query('q') q?: string
): Promise<Department[]> {
        return this.service.searchDepartment(id, q);
    }
}
