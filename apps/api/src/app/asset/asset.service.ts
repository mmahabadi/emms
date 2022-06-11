import {Injectable} from "@nestjs/common";
import {from, Observable} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {OperPostEntity} from "../oper/models/post.entity";
import {Repository} from "typeorm";
import {Asset} from "./asset.entity";

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

    async getAllAsset(orgId: string) {
        return await this.assetEntityRepository.find( {relations: ["org"], where:{
                org: orgId
            }});
    }
}
