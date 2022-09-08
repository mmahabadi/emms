import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";
import {Activity} from "./activity.entity";
import {PaginatedResponse} from "../util/pagination-response";

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityEntityRepository: Repository<Activity>,
    ) {}

    async insertActivity(activity: Activity) {
        // from(this.checkForSave(asset));
        const saveResult =  await this.activityEntityRepository.save(activity);
        return saveResult;

    }

    async getActivity(id: string): Promise<Activity | undefined> {
        // from(this.checkForSave(asset));
        return await this.activityEntityRepository.findOne(id, {relations: ["org", "parent"]});
    }

  async searchActivity(orgId: string, q:string) {
    const whereStr = {
      org: orgId,
      ...(q && { name: ILike(`%${q}%`) }),
    }

    const all = await  this.activityEntityRepository.createQueryBuilder("activity")
      .select("activity")
      .innerJoinAndSelect("activity.org", "org")
      .innerJoinAndSelect("activity.parent", "parent")
      .where(whereStr)
      .take(1000)
      .getMany();

    return all


  }
  async getAllActivities(orgId: string, code:string, name:string, page: number, pageSize: number) {
    const skip = (page-1) * pageSize;
    const whereStr = {
      org: orgId,
      ...(code && { code: ILike(`%${code}%`)}),
      ...(name && { name: ILike(`%${name}%`) }),
    }

    const all = await  this.activityEntityRepository.createQueryBuilder("activity")
      .select("activity")
      .innerJoinAndSelect("activity.org", "org")
      .innerJoinAndSelect("activity.parent", "parent")
      .where(whereStr)
      .take(pageSize)
      .skip(skip)
      .getManyAndCount();

    const [data, total] = all;
    return new PaginatedResponse<Activity[]>(data ,page, total, pageSize);

    // return await this.repository.find( {where:{
    //           org: orgId
    //       }});
  }
}
