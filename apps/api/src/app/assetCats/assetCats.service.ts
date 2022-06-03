import {Injectable} from "@nestjs/common";
import {from, Observable} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {OperPostEntity} from "../oper/models/post.entity";
import {Repository} from "typeorm";
import {AssetCat} from "./assetCat.entity";

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
        return await this.assetCatEntityRepository.find( {relations: ["parent"], where:{
                org: orgId
            }});
    }
}
