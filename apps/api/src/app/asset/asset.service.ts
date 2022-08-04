import {Injectable} from "@nestjs/common";
import {from} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";
import {Asset} from "./asset.entity";
import {JoinOptions} from "typeorm/find-options/JoinOptions";

@Injectable()
export class AssetService {
    constructor(
        @InjectRepository(Asset)
        private readonly assetEntityRepository: Repository<Asset>,
    ) {}

    insertAsset(assetEntity: Asset) {
        // from(this.checkForSave(assetCats));
        return from(this.assetEntityRepository.save(assetEntity));
    }

    getAsset(id: string) :Promise<Asset | undefined> {
        // from(this.checkForSave(assetCats));
        return this.assetEntityRepository.findOne(id);
    }

    async getAllAsset(orgId: string, code:string, name:string, cat:string, location:string) {//todo mohsen check cat & location
      const whereStr = {
        org: orgId,
        ...(code && { code: ILike(`%${code}%`)}),
        ...(name && { name: ILike(`%${name}%`) }),
        ...(cat && { assetCatId: cat }),
        ...(location && { locationId: location }),
      }
      //
      //   const allAsset =  await this.assetEntityRepository.find( {relations: ["org", "assetCatId", "parent", "location"], where:whereStr});
      // return allAsset;
      const allAsset =  this.assetEntityRepository.createQueryBuilder("asset")
        .select("asset")
        .innerJoinAndSelect("asset.assetCat", "assetCat")
        .innerJoinAndSelect("asset.org", "org")
        .innerJoinAndSelect("asset.location", "location")
        .where(whereStr)
        .getMany();

      return allAsset;
    }

    async search(orgId: string, q: string) {
      return await this.assetEntityRepository.find({
        where: {
          name: ILike(`%${q}%`)
        }
      });
    }
}
