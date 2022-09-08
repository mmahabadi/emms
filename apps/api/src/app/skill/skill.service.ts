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

    async getAllSkill(orgId: string, code:string, name:string) {
      const whereStr = {
      org: orgId,
      ...(code && { code: ILike(`%${code}%`)}),
      ...(name && { name: ILike(`%${name}%`) }),
    }

      const allSkills =  this.repository.createQueryBuilder("skill")
        .select("skill")
        .innerJoinAndSelect("skill.org", "org")
        .where(whereStr)
        .getMany();

      return allSkills;
      // return await this.repository.find( {where:{
      //           org: orgId
      //       }});
    }
}
