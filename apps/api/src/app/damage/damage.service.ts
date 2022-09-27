import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";
import {Damage} from "./damage.entity";
import {PaginatedResponse} from "../util/pagination-response";
import {AssetCat} from "../assetCats/assetCat.entity";

@Injectable()
export class DamageService {
    constructor(
        @InjectRepository(Damage)
        private readonly repository: Repository<Damage>,
    ) {}

    async insertDamage(damage: Damage) {
        // from(this.checkForSave(asset));
        return await this.repository.save(damage);
    }

    async getDamage(id: string): Promise<Damage | undefined> {
        // from(this.checkForSave(asset));
        return await this.repository.findOne(id, {relations: ["org"]});
    }

  async searchDamage(orgId: string, q:string) {
    const whereStr = {
      org: orgId,
      ...(q && { name: ILike(`%${q}%`) }),
    }

    const all  = await  this.repository.createQueryBuilder("damage")
      .select("damage")
      .innerJoinAndSelect("damage.org", "org")
      .where(whereStr)
      .take(1000)
      .getMany();

    return all;


  }


  async getAllDamage(orgId: string, code:string, name:string, page: number, pageSize: number) {
      const skip = (page-1) * pageSize;
      const whereStr = {
        org: orgId,
        ...(code && { code: ILike(`%${code}%`)}),
        ...(name && { name: ILike(`%${name}%`) }),
      }

      const all = await  this.repository.createQueryBuilder("damage")
        .select("damage")
        .innerJoinAndSelect("damage.org", "org")
        .where(whereStr)
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

    const [data, total] = all;
      const ddd = new PaginatedResponse<Damage[]>(data ,page, total, pageSize);

      return ddd;
      // return await this.repository.find( {where:{
      //           org: orgId
      //       }});
    }
}
