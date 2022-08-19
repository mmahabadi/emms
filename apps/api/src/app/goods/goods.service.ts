import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";
import {Goods} from "./goods.entity";

@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(Goods)
        private readonly repository: Repository<Goods>,
    ) {}

    async insertGoods(goods: Goods) {
        // from(this.checkForSave(asset));
        return await this.repository.save(goods);
    }

    async getGoods(id: string): Promise<Goods | undefined> {
        // from(this.checkForSave(asset));
        return await this.repository.findOne(id, {relations: ["org"]});
    }

    async getAllGoods(orgId: string, code:string, name:string) {
      const whereStr = {
        org: orgId,
        ...(code && { code: ILike(`%${code}%`)}),
        ...(name && { name: ILike(`%${name}%`) }),
      }

      const allGoods =  this.repository.createQueryBuilder("goods")
        .select("goods")
        .where(whereStr)
        .getMany();

      return allGoods;
      // return await this.repository.find( {where:{
      //           org: orgId
      //       }});
    }

    async search(orgId: string, q: string) {
      return await this.repository.find({
        where: {
          name: ILike(`%${q}%`),
          org: orgId
        }
      });
    }
}
