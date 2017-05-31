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
     * @param area area search filter
     * @param offset result offset
     * @param size size of return result
     *
     * @returns {Promise<void>}
     */
    @Get("/accidents")
    public async findAccidents(@QueryParam("area") area: string,
                               @QueryParam("offset") offset: number,
                               @QueryParam("limit") limit: number): Promise<AccidentSummary[]> {
        Utils.checkArguments(offset != null, "Offset must be set");
        Utils.checkArguments(offset >= 0, "Offset cannot be negative");
        Utils.checkArguments(limit != null, "Size must be set");
        Utils.checkArguments(limit > 0, "Size must be superior to zero");

        this.logger.info("Find all traffic information");
        let areaSearchFilter: SearchFilter;
        if (!Utils.isNullOrEmpty(area)) {
            areaSearchFilter = new SearchFilter(area);
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

        const accidents = await this.trafficQueryService.findTrafficAccidents(query);
        const returnedAccidents: AccidentSummary[] = [];

        for (const accident of accidents) {
            const accidentMinimal: AccidentSummary = new AccidentSummary();
            accidentMinimal.setId(accident.getId());
            accidentMinimal.setLocation(new Location());
            accidentMinimal.getLocation().setAddress(accident.getLocation().getAddress());
            accidentMinimal.getLocation().setLatitude(accident.getLocation().getLatitude());
            accidentMinimal.getLocation().setlongitude(accident.getLocation().getLongitude());

            returnedAccidents.push(accidentMinimal);
        }

        return returnedAccidents;
    }
}
