import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
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

    async getAllGoods(orgId: string) {
        return await this.repository.find( {where:{
                org: orgId
            }});
    }
}
