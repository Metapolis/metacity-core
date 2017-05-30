import { Client } from "elasticsearch";
import { inject, injectable } from "inversify";
import { TrafficQueryService } from "../TrafficQueryService";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { Config } from "../../../Config";
import { CarAccidentDTO } from "../dto/accident/CarAccidentDTO";
import { LocationDTO } from "../dto/accident/LocationDTO";
import { ClimatologyDTO } from "../dto/accident/ClimatologyDTO";
import { FindTrafficAccidentQuery } from "../../../common/query/FindTrafficAccidentQuery";

/**
 * Implementation of {@link TrafficQueryService}
 */
@injectable()
export class TrafficQueryServiceImpl implements TrafficQueryService {

    /**
     * TrafficQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TrafficQueryServiceImpl.name);

    /**
     * Traffic querying service
     */
    @inject("ESClient")
    private esClient: Client;

    /**
     * Override
     */
    public async findTrafficAccidents(query: FindTrafficAccidentQuery): Promise<CarAccidentDTO[]> {
        this.logger.info("Retrieve all traffic accident in elastic search");
        const jsonAccidents = (await this.esClient.search({
            index: query.getIndex(),
            type: query.getType(),
            size: query.getSize(),
            from: query.getOffset()
        })).hits;

        const accidents: CarAccidentDTO[] = [];
        for (const jsonAccident of jsonAccidents.hits) {
            accidents.push(new CarAccidentDTO(jsonAccident._source));
        }

        return accidents;
    }
}
