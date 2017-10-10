import {CircleDao} from "../CircleDao";
import {ActivityCircle} from "../../domain/ActivityCircle";
import {Utils} from "../../../common/Utils";
import {LoggerInstance} from "winston";
import * as TypeORM from "typeorm";
import {inject, injectable} from "inversify";

/**
 * Implementation of {@link CircleDao}
 */
@injectable()
export class CircleDaoImpl implements CircleDao {

    /**
     * CircleDaoImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CircleDaoImpl.name);

    /**
     * Circle data access
     */
    @inject("ActivityCircleRepository")
    private activityCircleRepository: TypeORM.Repository<ActivityCircle>;

    /**
     * Override
     */
    public async saveOrUpdate(circle: ActivityCircle): Promise<void> | undefined {
        this.logger.info("Persist new circle '%s'", circle.getName());
        await this.activityCircleRepository.persist(circle);
        this.logger.info("Circle saved");
    }

    /**
     * Override
     */
    public async exists(id: number): Promise<boolean> {
        this.logger.debug("Check in data base if circle with id '%s' exists", id);

        return (await this.activityCircleRepository.count({id: id})) > 0;
    }

    /**
     * Override
     */
    public async findById(id: number): Promise<ActivityCircle> | undefined {
        this.logger.info("Retrieve circle with identifier '%s'", id);

        return await this.activityCircleRepository.findOneById(id);
    }

    /**
     * Override
     */
    public async isOwnedByCollectivity(circleId: number, accessKey: string): Promise<boolean> {
        this.logger.debug("Check if circle '%s' is owned by collectivity '%s' in database", circleId, accessKey);

        return (await this.activityCircleRepository.createQueryBuilder("c")
            .innerJoin("c.collectivity", "col")
            .where("c.id = :circleid", {circleid: circleId})
            .andWhere("col.id = :accesskey", {accesskey: accessKey})
            .getCount()) === 1;
    }
}
