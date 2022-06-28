import {Injectable} from "@nestjs/common";
import {from} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {AssetCat} from "./assetCat.entity";
import {PaginatedResponse} from "../util/pagination-response";

@Injectable()
export class AssetCatsService {
    constructor(
        @InjectRepository(AssetCat)
        private readonly assetCatEntityRepository: Repository<AssetCat>,
    ) {}

    insertAssetCat(assetCatEntity: AssetCat) {
        // from(this.checkForSave(asset));
        return from(this.assetCatEntityRepository.save(assetCatEntity));
    }

    getAssetCat(id: string) :Promise<AssetCat | undefined> {
        // from(this.checkForSave(asset));
        return this.assetCatEntityRepository.findOne(id, {relations:["org"]});
    }

    async getAllAssetCat(orgId: string) {
      return await this.assetCatEntityRepository.find({
        // relations: ["parent"],
        where: {
          org: orgId
        }
      });
    }

    async search(orgId: string, q: string) {
      return await this.assetCatEntityRepository.find({
        where: {
          org: orgId,
          name: Like(`%${q}%`)
        },

      });
    }

    async getAllAssetCatWithPaging(orgId: string, page: number, pageSize: number) {
        const skip = (page-1) * pageSize;
        // const keyword = query.keyword || ''
        const response = await this.assetCatEntityRepository.findAndCount(
          {
            where:{
              org: orgId,
              // name: Like('%' + keyword + '%')
            },
            // order: { name: "DESC" },
            take: pageSize,
            skip
          });
      const [data, total] = response;
      return new PaginatedResponse<AssetCat[]>(data ,page, total, pageSize);
    }
}
