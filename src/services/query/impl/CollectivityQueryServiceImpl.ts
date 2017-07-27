import { CollectivityQueryService } from "../CollectivityQueryService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { CollectivityDao } from "../../../persistence/dao/CollectivityDao";
import { CollectivityDTO } from "../dto/collectivity/CollectivityDTO";
import { Collectivity } from "../../../persistence/domain/Collectivity";

/**
 * Implementation of {@link TrafficQueryService}
 */
@injectable()
export class CollectivityQueryServiceImpl implements CollectivityQueryService {

    /**
     * TrafficQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CollectivityQueryServiceImpl.name);

    /**
     * Collectivity data access object
     */
    @inject("CollectivityDao")
    private collectivityDao: CollectivityDao;

    /**
     * Override
     * @param domain
     * @returns {undefined}
     */
    public async findCollectivity(domain: string): Promise<CollectivityDTO> {
        Utils.checkArgument(Utils.isNullOrEmpty(domain), "Domain cannot be null or empty");

        const collectivity: Collectivity = await this.collectivityDao.findById(domain);
        Utils.checkArgument(domain !== undefined, "Collectivity not found");

        const collectivityDto: CollectivityDTO = new CollectivityDTO();
        collectivityDto.setId(collectivity.getId());
        collectivityDto.setName(collectivity.getName());
        collectivityDto.setSecret(collectivity.getSecret());

        return collectivityDto;
    }

}
