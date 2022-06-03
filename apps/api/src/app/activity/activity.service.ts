import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Activity} from "./activity.entity";

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity)
        private readonly activityEntityRepository: Repository<Activity>,
    ) {}

    async insertActivity(activity: Activity) {
        // from(this.checkForSave(asset));
        return await this.activityEntityRepository.save(activity);
    }

    async getActivity(id: string): Promise<Activity | undefined> {
        // from(this.checkForSave(asset));
        return await this.activityEntityRepository.findOne(id, {relations: ["org", "parent"]});
    }

    async getAllActivity(orgId: string) {
        return await this.activityEntityRepository.find( {relations: ["parent"], where:{
                org: orgId
            }});
    }
}
