import {Client} from "elasticsearch";
import {inject, injectable} from "inversify";
import {TrafficQueryService} from "../TrafficQueryService";
import {LoggerInstance} from "winston";
import {Utils} from "../../../common/Utils";
import {Config} from "../../../Config";
import {CarAccident} from "../dto/accident/CarAccident";

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
    public async findTrafficAccident(): Promise<CarAccident[]> {
        this.logger.info("Retrieve all traffic accident in elastic search");
        const jsonAccidents = (await this.esClient.search({
            index: Config.getIndexNameTraffic(),
            type: Config.getDocumentNameAccident()
        })).hits;

        const accidents: CarAccident[] = [];
        for (const jsonAccident of jsonAccidents.hits) {
            accidents.push(Object.assign(new CarAccident(), jsonAccident));
        }

        return accidents;
    }
}
