import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {Skill} from "./skill.entity";
import {SkillService} from "./skill.service";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('skill')
@Controller('skill')
export class SkillController {
    constructor(private service: SkillService) {}
    @Post()
    create(@Body() entity: Skill): Promise<Skill> {
        return this.service.insertSkill(entity);
    }
    @Get(':id')
    get(@Param('id') id: string): Promise<Skill> {
        return this.service.getSkill(id);
    }
    @Get('all/:id')
    getAll(@Param('id') id: string): Promise<Skill[]> {
        return this.service.getAllSkill(id);
    }
}
