import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OperPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OperPost } from '../models/post.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class OperService {
  constructor(
    @InjectRepository(OperPostEntity)
    private readonly operPostRepository: Repository<OperPostEntity>,
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
}
