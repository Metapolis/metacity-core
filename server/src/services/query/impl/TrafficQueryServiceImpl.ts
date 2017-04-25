import {Client} from "elasticsearch";
import {inject, injectable} from "inversify";
import {TrafficQueryService} from "../TrafficQueryService";
import {LoggerInstance} from "winston";
import {Utils} from "../../../common/Utils";

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
    public async findTrafficIncident() {
        this.logger.info("Retrieve all traffic incident in elastic search");
        return (await this.esClient.search({
            index: "test",
        })).hits.hits[0]._source;
    }
}
