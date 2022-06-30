import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {Location} from "./location.entity";

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Location)
        private readonly locationEntityRepository: Repository<Location>,
    ) {}

    async insertLocation(location: Location) {
        // from(this.checkForSave(asset));
        return await this.locationEntityRepository.save(location);
    }

    async getLocation(id: string): Promise<Location | undefined> {
        // from(this.checkForSave(asset));
        return await this.locationEntityRepository.findOne(id, {relations: ["org", "parent"]});
    }

    async getAllLocation(orgId: string) {
        return await this.locationEntityRepository.find( {relations: ["parent"], where:{
                org: orgId
            }});
    }

  async search(orgId: string, q: string) {
    return await this.locationEntityRepository.find({
      relations: ["parent"],
      where: {
        org: orgId,
        name: Like(`%${q}%`)
      },
      select: ["id", "name", "parent"]
    });
  }

  async tree(orgId: string, q: string) {
    const result = await this.locationEntityRepository.query(
      `Select l.*, c.children
    from mms.location l
    inner join (
      Select parent_id, json_agg(json_build_object('id', id, 'code', code, 'name', name)) as children
    from mms.location
    where parent_id != id
    group By 1
  )c on c.parent_id = l.id
  Where l.org_id = $1`,
      [orgId],
    );
    return result;

  }

}
