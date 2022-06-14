import {Body, Injectable, Post} from '@nestjs/common';
import { Repository } from 'typeorm';
import { OperPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OperPost } from '../models/post.interface';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {AuthModel} from "@emms/models";

@Injectable()
export class OperService {
  constructor(
    @InjectRepository(OperPostEntity)
    private readonly operPostRepository: Repository<OperPostEntity>,
    private readonly jwtService: JwtService
  ) {}

  createOper(operPost: OperPost): Observable<OperPost> {
    from(this.checkForSave(operPost));
    return from(this.operPostRepository.save(operPost));
  }

  async checkForSave(operPost: OperPost) {
    // const sql = "select id from pbl.oper where id = '" + operPost.id + "' for Update";
    // const ret = await this.operPostRepository.query(sql);

    const oldResult = await this.operPostRepository.query(
      'select mobile_number from pbl.oper where id =  $1 for update',
      [operPost.id],
    );
    console.log(oldResult);
    if (oldResult) {
      if (oldResult[0].mobile_number !== operPost.mobile_number)
        console.log('mobile change');
    }
    // const sqlStr = sql
    //   .select('*')
    //   .from('pbl.oper')
    //   .where({ id: operPost.id })
    //   .toString();
    // const ret = await this.operPostRepository.query(sqlStr);
    // console.log(ret);
  }

  async login(loginParam: any):Promise<OperPost> {
    // from(this.checkForSave(assetCats));
    const result = await this.operPostRepository.query(`Select
  a.id,
  a.mobile_number,
  a.name,
  a.lastname,
  a.email,
  a.password,
  ob.orgs
from
  pbl.oper a
  cross join lateral (
    select
      array_to_json(
        array_agg(
          json_build_object('orgId', obi.org_id, 'roles', obi.roles)
        )
      ) as orgs
    from
      pbl.oper_org obi
    where
      obi.oper_id = a.id
  ) ob
where
  a.mobile_number = '${loginParam.mobileNumber}'`);

    if(result.length===0) return null;

    const hash:string = result[0].password;
    delete result[0].password;
    let match: boolean;

    if(loginParam.encrypted){
      match = loginParam.password === hash;
    }else if(hash.startsWith('$')){
      try{
        const newHash = await bcrypt.hash(loginParam.password, 5);
        console.log(newHash)
        console.log(hash)
        match = await bcrypt.compare(loginParam.password, hash);

      }catch (e) {
        console.log(e)

      }

    }else{
      match = loginParam.password===hash;
      if(match){
        const newHash = await bcrypt.hash(hash, 5);
        await this.operPostRepository.query(`update pbl.oper set password = $2
            where mobile_number = $1;`,
          [loginParam.mobileNumber, newHash],
        );
      }
    }
    // const oper:OperPostEntity =result.rows[0];
    return match ? result[0] : null;
  }


  @Post('verify_token')
  verifyToken(@Body() entry: AuthModel): Observable<AuthModel> {

    if(entry.api_token){
      const verify = this.jwtService.verify(entry.api_token);
      return verify;
    }
  }


}
