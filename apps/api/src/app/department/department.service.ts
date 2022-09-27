import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ILike, Repository} from "typeorm";
import {Department} from "./department.entity";
import {PaginatedResponse} from "../util/pagination-response";
import {AssetCat} from "../assetCats/assetCat.entity";

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly repository: Repository<Department>,
    ) {}

    async insertDepartment(department: Department) {
        // from(this.checkForSave(asset));
        return await this.repository.save(department);
    }

    async getDepartment(id: string): Promise<Department | undefined> {
        // from(this.checkForSave(asset));
        return await this.repository.findOne(id, {relations: ["org"]});
    }

  async searchDepartment(orgId: string, q:string) {
    const whereStr = {
      org: orgId,
      // ...(q && { name: ILike(`%${q}%`) }),
    }

    const allDepartment = await  this.repository.createQueryBuilder("department")
      .select("department")
      .innerJoinAndSelect("department.org", "org")
      .where(whereStr)
      .take(1000)
      .getMany();

    return allDepartment


  }


  async getAllDepartment(orgId: string, code:string, name:string, page: number, pageSize: number) {
      const skip = (page-1) * pageSize;
      const whereStr = {
        org: orgId,
        ...(code && { code: ILike(`%${code}%`)}),
        ...(name && { name: ILike(`%${name}%`) }),
      }

      const allDepartment = await  this.repository.createQueryBuilder("department")
        .select("department")
        .innerJoinAndSelect("department.org", "org")
        .where(whereStr)
        .take(pageSize)
        .skip(skip)
        .getManyAndCount();

    const [data, total] = allDepartment;
      const ddd = new PaginatedResponse<Department[]>(data ,page, total, pageSize);

      return ddd;
      // return await this.repository.find( {where:{
      //           org: orgId
      //       }});
    }
}
