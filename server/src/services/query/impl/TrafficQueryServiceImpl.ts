import { Client } from "elasticsearch";
import { inject, injectable } from "inversify";
import { TrafficQueryService } from "../TrafficQueryService";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { Config } from "../../../Config";
import { CarAccidentDTO } from "../dto/accident/CarAccidentDTO";
import { LocationDTO } from "../dto/accident/LocationDTO";
import { ClimatologyDTO } from "../dto/accident/ClimatologyDTO";

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
    public async findTrafficAccidents(): Promise<CarAccidentDTO[]> {
        this.logger.info("Retrieve all traffic accident in elastic search");
        const jsonAccidents = (await this.esClient.search({
            index: Config.getIndexNameTraffic(),
            type: Config.getDocumentNameAccident()
        })).hits;

        const accidents: CarAccidentDTO[] = [];
        for (const jsonAccident of jsonAccidents.hits) {
            // Truly ugly tricky, I hate this shit !
            // You can't copy this stuff
            // TODO remove this
            const accident: CarAccidentDTO = Object.setPrototypeOf(jsonAccident._source, CarAccidentDTO.prototype);
            accident.setLocation(Object.setPrototypeOf(accident.getLocation(), LocationDTO.prototype));
            accident.setClimatology(Object.setPrototypeOf(accident.getClimatology(), ClimatologyDTO.prototype));
            accidents.push(accident);

        }

        return accidents;
    }
}
