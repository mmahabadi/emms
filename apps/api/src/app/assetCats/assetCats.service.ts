import {Injectable} from "@nestjs/common";
import {from} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, ILike, Repository} from "typeorm";
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
        return this.assetCatEntityRepository.findOne(id,  {relations: ["org", "parent"]});
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

    async getAllAssetCatWithPaging(orgId: string, code:string, name:string, page: number, pageSize: number) {
 const skip = (page - 1) * pageSize;
      const whereStr = {
        org: orgId,
        ...(code && {code: ILike(`%${code}%`)}),
        ...(name && {name: ILike(`%${name}%`)}),
      }

      const allLocation = await this.assetCatEntityRepository.createQueryBuilder("asset_cat")
        .select("asset_cat")
        .innerJoinAndSelect("asset_cat.org", "org")
        .innerJoinAndSelect("asset_cat.parent", "parent")
        .where(whereStr)
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

      const [data, total] = allLocation;
      return new PaginatedResponse<Location[]>(data, page, total, pageSize);
    }
}
