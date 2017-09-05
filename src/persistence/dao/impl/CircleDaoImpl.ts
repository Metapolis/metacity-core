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
        this.logger.info("Persist new circle '%s'", circle.getName);
        await this.activityCircleRepository.persist(circle);
        this.logger.info("Circle saved");
    }
}
