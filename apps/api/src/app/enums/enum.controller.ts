import {ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param, Query} from "@nestjs/common";
import {Response} from "@emms/models";
import {EnumsService} from "./enums.service";

@ApiTags('enums')
@Controller('enums')
export class EnumsController {
  constructor(private service: EnumsService) {}

  @Get('request-type')
  getRequestType(): Promise<any[]> {
    return this.service.getRequestType();
  }

  @Get('importance-type')
  getImportanceType(): Promise<any[]> {
    return this.service.getImportanceType();
  }

}
