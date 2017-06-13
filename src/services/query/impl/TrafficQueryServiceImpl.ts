import { Client } from "elasticsearch";
import { inject, injectable } from "inversify";
import { TrafficQueryService } from "../TrafficQueryService";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { CarAccidentDTO } from "../dto/accident/CarAccidentDTO";
import { FindTrafficAccidentQuery } from "../../../common/query/FindTrafficAccidentQuery";
import { ResultList } from "../../../common/ResultList";
import { QueryBuilder } from "../builder/elasticsearch/QueryBuilder";

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
    public async findTrafficAccidents(query: FindTrafficAccidentQuery): Promise<ResultList<CarAccidentDTO>> {
        this.logger.info("Retrieve all traffic accident in elastic search");

        const jsonAccidents = (await this.esClient.search({
            index: query.getIndex(),
            type: query.getType(),
            size: query.getLimit(),
            from: query.getOffset(),
        })).hits;
        const accidents: CarAccidentDTO[] = [];
        for (const jsonAccident of jsonAccidents.hits) {
            accidents.push(new CarAccidentDTO(jsonAccident._source));
        }

        return new ResultList<CarAccidentDTO>(jsonAccidents.total, accidents);
    }
}
