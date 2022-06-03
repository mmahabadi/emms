import { Body, Controller, Post } from '@nestjs/common';
import { OperService } from '../services/oper.service';
import { OperPost } from '../models/post.interface';
import { Observable } from 'rxjs';

@Controller('oper')
export class OperController {
  constructor(private operService: OperService) {}
  @Post()
  create(@Body() oper: OperPost): Observable<OperPost> {
    return this.operService.createOper(oper);
  }
}
