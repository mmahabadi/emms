import {Injectable} from "@nestjs/common";
import {from} from "rxjs";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {Org} from "./org.entity";

@Injectable()
export class OrgService {
    constructor(
        @InjectRepository(Org)
        private readonly orgRepository: Repository<Org>,
    ) {}


    insertOrg(orgEntity: Org) {
        // from(this.checkForSave(asset));
        return from(this.orgRepository.save(orgEntity));
    }

    async getOrg(id: string): Promise<Org | undefined> {
        try{
            const org = await this.orgRepository.findOne(id);
            return org
            // const org =  await this.orgRepository.createQueryBuilder("org").innerJoinAndSelect("currency", "currency", "currency.id = org.currency_id")
            //     .where('org.id = :id', { id }) .getOne()
            // return org;

        }catch (e){
            console.log(e)
        }
    }

  async search(q: string) :Promise<Org[]> {
    return await this.orgRepository.find({
      where: {
        name: Like(`%${q}%`)
      },

    });
  }
}
