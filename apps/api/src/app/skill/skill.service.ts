import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";
import {Skill} from "./skill.entity";

@Injectable()
export class SkillService {
    constructor(
        @InjectRepository(Skill)
        private readonly repository: Repository<Skill>,
    ) {}

    async insertSkill(skill: Skill) {
        // from(this.checkForSave(asset));
        return await this.repository.save(skill);
    }

    async getSkill(id: string): Promise<Skill | undefined> {
        // from(this.checkForSave(asset));
        return await this.repository.findOne(id, {relations: ["org"]});
    }

    async getAllSkill(orgId: string) {
        return await this.repository.find( {where:{
                org: orgId
            }});
    }

    async search(orgId: string, q: string) {
      return await this.repository.find({
        where: {
          name: ILike(`%${q}%`),
          org: orgId
        }
      });
    }
}
