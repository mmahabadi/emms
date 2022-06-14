import { Body, Controller, Post } from '@nestjs/common';
import { OperService } from '../services/oper.service';
import { OperPost } from '../models/post.interface';
import {Observable, throwError} from 'rxjs';
import {AuthModel, LoginInputs} from "@emms/models";
import {JwtService} from "@nestjs/jwt";


@Controller('oper')
export class OperController {
  constructor(private operService: OperService, private jwtService: JwtService) {}
  @Post()
  create(@Body() oper: OperPost): Observable<OperPost> {
    return this.operService.createOper(oper);
  }
  @Post('login')
  async login(@Body() entry: LoginInputs): Promise<AuthModel> {
    const loginParam = {
      mobileNumber: entry.mobileNumber || entry.username,
      password: entry.password,
    };
    const result: OperPost = await this.operService.login(loginParam);
    if (result) {
      result.token = this.jwtService.sign({id: result.id, roles: ['admin']});
      // reply.send(result);
      return {
        api_token :result.token
      };
    }
     pause(500);//this pause is to make the life of hacker harder for brute-force attack
    // throwError('mobileNumber', 'mismatch', 'mobileNumber mismatch!', 'auth.mobileNumber');

  }

  @Post('verify_token')
  verifyToken(@Body() entry: AuthModel): Observable<AuthModel> {
    return this.operService.verifyToken(entry);

  }

  }

export function pause(timout: number): Promise<void> {
  // tslint:disable-next-line:no-shadowed-variable
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timout);
  });
}
