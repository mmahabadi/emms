import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PaginatedResponse} from "../util/pagination-response";
import {JobRequest} from "./jobRequest.entity";

@Injectable()
export class JobRequestService {
    constructor(
        @InjectRepository(JobRequest)
        private readonly repository: Repository<JobRequest>,
    ) {}

    async insertJobRequest(jobRequest: JobRequest) {
        // from(this.checkForSave(asset));
        return await this.repository.save(jobRequest);
    }

    async getJobRequest(id: string): Promise<JobRequest | undefined> {
        // from(this.checkForSave(asset));
        return await this.repository.findOne(id, {relations: ["org"]});
    }

    async getAllJobRequest(orgId: string, page: number, pageSize: number) {
      const skip = (page - 1) * pageSize;
      const whereStr = {
        org: orgId,
      }

      const all = await this.repository.createQueryBuilder("job_request")
        .select("job_request")
        .innerJoinAndSelect("job_request.org", "org")
        .innerJoinAndSelect("job_request.asset", "asset")
        .innerJoinAndSelect("job_request.damage", "damage")
        .where(whereStr)
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

      const [data, total] = all;
      return new PaginatedResponse<JobRequest[]>(data, page, total, pageSize);

    }

  async searchJobRequest(orgId: string, q:string) {
    const whereStr = {
      org: orgId,
      // ...(q && { name: ILike(`%${q}%`) }),
    }

    const all = await  this.repository.createQueryBuilder("jobRequest")
      .select("jobRequest")
      .innerJoinAndSelect("jobRequest.org", "org")
      .where(whereStr)
      .take(1000)
      .getMany();

    return all


  }
}
