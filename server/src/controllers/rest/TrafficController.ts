import { Controller, Delete, Get, interfaces, Post, QueryParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { TrafficQueryService } from "../../services/query/TrafficQueryService";
import { AccidentSummary } from "./model/accident/AccidentSummary";
import { Location } from "./model/accident/Location";
import { SearchFilter } from "./model/common/SearchFilter";
import { FindTrafficAccidentQuery } from "../../common/query/FindTrafficAccidentQuery";
import { LogicalQueryCriteria } from "../../common/query/LogicalQueryCriteria";
import { GeoShape } from "../../common/GeoShape";
import { ResultList } from "../../common/ResultList";
import { CarAccidentDTO } from "../../services/query/dto/accident/CarAccidentDTO";

/**
 * API resources to delivery service to access to traffic element
 *
 * /api/traffics route
 *
 * @class TrafficController
 */
@Controller("/api/traffics")
@injectable()
export class TrafficController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TrafficController.name);

    /**
     * Traffic querying service
     */
    @inject("TrafficQueryService")
    private trafficQueryService: TrafficQueryService;

    /**
     * Get traffic accident information
     *
     * @param areas area search filter
     * @param offset result offset
     * @param limit size of return result
     *
     * @returns {Promise<void>}
     */
    @Get("/accidents")
    public async findAccidents(@QueryParam("areas") areas: string,
                               @QueryParam("offset") offset: number,
                               @QueryParam("limit") limit: number): Promise<ResultList<AccidentSummary>> {
        Utils.checkArguments(offset != null, "Offset must be set");
        Utils.checkArguments(offset >= 0, "Offset cannot be negative");
        Utils.checkArguments(limit != null, "Size must be set");
        Utils.checkArguments(limit > 0, "Size must be superior to zero");

        this.logger.info("Find all traffic information");
        let areaSearchFilter: SearchFilter;
        if (!Utils.isNullOrEmpty(areas)) {
            areaSearchFilter = new SearchFilter(areas);
        }
        const query: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        query.setOffset(Number(offset));
        query.setLimit(Number(limit));

        // Prepare the area filter
        if (areaSearchFilter != null) {
            const mustParam: GeoShape[] = [];
            const shouldParams: GeoShape[] = [];

            // Parse must params
            for (const must of areaSearchFilter.getMustValues()){
                mustParam.push(Utils.parseGeoShape(must));
            }

            // Parse should params
            for (const should of areaSearchFilter.getShouldValues()){
                shouldParams.push(Utils.parseGeoShape(should));
            }

            // Create criteria
            const geoFilter: LogicalQueryCriteria<GeoShape> = new LogicalQueryCriteria<GeoShape>(mustParam, shouldParams);
            query.setGeoFilter(geoFilter);
        }

        const resultListAccidents: ResultList<CarAccidentDTO> = await this.trafficQueryService.findTrafficAccidents(query);
        const returnedAccidents: AccidentSummary[] = [];

        for (const accident of resultListAccidents.results) {
            const accidentMinimal: AccidentSummary = new AccidentSummary();
            accidentMinimal.id = accident.getId();
            accidentMinimal.location = new Location();
            accidentMinimal.location.address = accident.getLocation().getAddress();
            accidentMinimal.location.latitude = accident.getLocation().getLatitude();
            accidentMinimal.location.longitude = accident.getLocation().getLongitude();

            returnedAccidents.push(accidentMinimal);
        }

        return new ResultList<AccidentSummary>(resultListAccidents.total, returnedAccidents);
    }
}
