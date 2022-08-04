import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";
import {Goods} from "./goods.entity";
import {PaginatedResponse} from "../util/pagination-response";
import {AssetCat} from "../assetCats/assetCat.entity";

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

    async getAllGoods(orgId: string, code:string, name:string, page: number, pageSize: number) {
      const skip = (page-1) * pageSize;
      const whereStr = {
        org: orgId,
        ...(code && { code: ILike(`%${code}%`)}),
        ...(name && { name: ILike(`%${name}%`) }),
      }

      const allGoods = await  this.repository.createQueryBuilder("goods")
        .select("goods")
        .innerJoinAndSelect("goods.org", "org")
        .where(whereStr)
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

    const [data, total] = allGoods;
      const ddd = new PaginatedResponse<Goods[]>(data ,page, total, pageSize);

      return ddd;
      // return await this.repository.find( {where:{
      //           org: orgId
      //       }});
    }
}
