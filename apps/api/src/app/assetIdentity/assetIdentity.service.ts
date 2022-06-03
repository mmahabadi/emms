import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AssetIdentity} from "./assetIdentity.entity";

@Injectable()
export class AssetIdentityService {
    constructor(
        @InjectRepository(AssetIdentity)
        private readonly repository: Repository<AssetIdentity>,
    ) {}

    async insertAssetIdentity(assetIdentity: AssetIdentity) {
        // from(this.checkForSave(asset));
        return await this.repository.save(assetIdentity);
    }

    async getAssetIdentity(id: string): Promise<AssetIdentity | undefined> {
        // from(this.checkForSave(asset));
        return await this.repository.findOne(id, {relations: ["org"]});
    }

    async getAllAssetIdentity(orgId: string) {
        return await this.repository.find( {relations: ["parent"], where:{
                org: orgId
            }});
    }
}
