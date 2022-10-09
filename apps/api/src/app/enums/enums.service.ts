import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Department} from "../department/department.entity";

@Injectable()
export class EnumService {


  async getRequestType(): Promise<any[]> {
    return ['TW3CM', 'W1EM', 'W2CM', 'W3PM', 'W4IM']
  }

}
