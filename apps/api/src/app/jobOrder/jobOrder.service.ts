import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Like, Repository} from "typeorm";
import {PaginatedResponse} from "../util/pagination-response";
import {Goods} from "../goods/goods.entity";
import {JobOrder} from "./jobOrder.entity";

@Injectable()
export class JobOrderService {
    constructor(
        @InjectRepository(JobOrder)
        private readonly repository: Repository<JobOrder>,
    ) {}

    async insertJobOrder(jobOrder: JobOrder) {
        // from(this.checkForSave(asset));
        return await this.repository.save(jobOrder);
    }

    async getJobOrder(id: string): Promise<JobOrder | undefined> {
        // from(this.checkForSave(asset));
        return await this.repository.findOne(id, {relations: ["org"]});
    }

    async getAllJobOrder(orgId: string, page: number, pageSize: number) {
      const skip = (page - 1) * pageSize;
      const whereStr = {
        org: orgId,
      }

      const all = await this.repository.createQueryBuilder("job_order")
        .select("job_order")
        .innerJoinAndSelect("job_order.org", "org")
        .where(whereStr)
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

      const [data, total] = all;
      return new PaginatedResponse<JobOrder[]>(data, page, total, pageSize);

    }

  async searchJobOrder(orgId: string, q:string) {
    const whereStr = {
      org: orgId,
      // ...(q && { name: ILike(`%${q}%`) }),
    }

    const all = await  this.repository.createQueryBuilder("jobOrder")
      .select("jobOrder")
      .innerJoinAndSelect("jobOrder.org", "org")
      .where(whereStr)
      .take(1000)
      .getMany();

    return all


  }
}
