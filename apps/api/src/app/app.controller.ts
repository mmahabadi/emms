import {Body, Controller, Get, Post} from '@nestjs/common';

import {AppService} from './app.service';
import {AuthModel, LoginInputs} from "@emms/models";
import {Observable, of} from "rxjs";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('login')
  login(@Body() entry: LoginInputs): Observable<AuthModel> {
    return of({
      "id":"0310554c-1d4c-4ace-8327-08bb2f5ed581",
      "mobileNumber":"09125965946",
      "name":"محسن",
      "lastname":"مه آبادی",
      "title":"Title",
      "email":"m.mehabadi@gmail.com",
      "extendedData":{},
      "orgs":[{"orgId":"67b9ff47-4b67-4dfa-b5d5-1b5b65f4e81b","roles":["owner"]}],
      api_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzMTA1NTRjLTFkNGMtNGFjZS04MzI3LTA4YmIyZjVlZDU4MSIsImlhdCI6MTY1NDI0NjMxNH0.G_j1gofk5ftg-7Hy4-8YTTMBlZLkkjbVypJ2V0jAUqs"
    } as any);
  }

  @Post('verify_token')
  verifyToken(@Body() entry: AuthModel): Observable<AuthModel> {
    return of({
          "id":"0310554c-1d4c-4ace-8327-08bb2f5ed581",
          "mobileNumber":"09125965946",
          "name":"محسن",
          "lastname":"مه آبادی",
          "title":"Title",
          "email":"m.mehabadi@gmail.com",
          "extendedData":{},
          "orgs":[{"orgId":"67b9ff47-4b67-4dfa-b5d5-1b5b65f4e81b","roles":["owner"]}],
          api_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzMTA1NTRjLTFkNGMtNGFjZS04MzI3LTA4YmIyZjVlZDU4MSIsImlhdCI6MTY1NDI0NjMxNH0.G_j1gofk5ftg-7Hy4-8YTTMBlZLkkjbVypJ2V0jAUqs"
    } as any);
  }
  @Post('forgot_password')
  forgotPassword(@Body() entry: AuthModel): Observable<{result: boolean}> {
    return of({result: true});
  }
}
