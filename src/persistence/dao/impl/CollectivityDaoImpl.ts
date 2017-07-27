import { CollectivityDao } from "../CollectivityDao";
import { Collectivity } from "../../domain/Collectivity";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { inject, injectable } from "inversify";

/**
 * Implementation of {@link CollectivityDao}
 */
@injectable()
export class CollectivityDaoImpl implements CollectivityDao {

    /**
     * CollectivityDaoImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CollectivityDaoImpl.name);

    /**
     * Collectivity data access
     */
    @inject("CollectivityRepository")
    private collectivityRepository: TypeORM.Repository<Collectivity>;

    /**
     * Override
     */
    public async findById(id: string): Promise<Collectivity> | undefined {
        this.logger.info("Retrieve collectivity with identifier '%s'", id);
        return await this.collectivityRepository.findOneById(id);
    }
}
