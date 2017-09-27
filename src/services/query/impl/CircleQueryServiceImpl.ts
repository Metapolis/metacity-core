import { CircleQueryService } from "../CircleQueryService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { CircleDao } from "../../../persistence/dao/CircleDao";

/**
 * Implementation of {@link CircleQueryService}
 */
@injectable()
export class CircleQueryServiceImpl implements CircleQueryService {

    /**
     * CircleQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CircleQueryServiceImpl.name);

    /**
     * Circle data access object
     */
    @inject("CircleDao")
    private circleDao: CircleDao;

    /**
     * Override
     */
    public async isExists(id: number): Promise<boolean> {
        this.logger.debug("Check if circle with id '%s' exists", id);

        return await this.circleDao.isExists(id);
    }
}
