/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

import { Controller, Get, interfaces, QueryParam } from "inversify-express-utils";
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
import { Climatology } from "./model/accident/Climatology";
import { Luminosity } from "../../common/enum/accident/Luminosity";
import { AtmosphericCondition } from "../../common/enum/accident/AtmosphericCondition";
import { CollisionType } from "../../common/enum/accident/CollisionType";
import { Role } from "../../common/enum/Role";
import { ClientControl, UserControl } from "../../common/Decorators";

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
     * TrafficController logger
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
    @ClientControl(Role.ACCESS_ACCIDENT)
    public async findAccidents(@QueryParam("areas") areas: string,
                               @QueryParam("offset") offset: number,
                               @QueryParam("limit") limit: number): Promise<ResultList<AccidentSummary>> {
        Utils.checkArgument(offset != null, "Offset must be set");
        Utils.checkArgument(offset >= 0, "Offset cannot be negative");
        Utils.checkArgument(limit != null, "Limit must be set");
        Utils.checkArgument(limit > 0, "Limit must be superior to zero");

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
            for (const must of areaSearchFilter.getMustValues()) {
                mustParam.push(Utils.parseGeoShape(must));
            }

            // Parse should params
            for (const should of areaSearchFilter.getShouldValues()) {
                shouldParams.push(Utils.parseGeoShape(should));
            }

            // Create criteria
            const geoFilter: LogicalQueryCriteria<GeoShape> = new LogicalQueryCriteria<GeoShape>(mustParam, shouldParams);
            query.setGeoFilter(geoFilter);
        }

        const resultListAccidents: ResultList<CarAccidentDTO> = await this.trafficQueryService.findTrafficAccidents(query);
        const returnedAccidents: AccidentSummary[] = [];

        for (const accident of resultListAccidents.results) {
            const accidentSummary: AccidentSummary = new AccidentSummary();
            accidentSummary.id = accident.getId();
            accidentSummary.location = new Location();
            accidentSummary.collisionType = CollisionType[accident.getCollisionType()];
            accidentSummary.location.address = accident.getLocation().getAddress();
            accidentSummary.location.latitude = accident.getLocation().getLatitude();
            accidentSummary.location.longitude = accident.getLocation().getLongitude();

            accidentSummary.climatology = new Climatology();
            accidentSummary.climatology.luminosity = Luminosity[accident.getClimatology().getLuminosity()];
            accidentSummary.climatology.atmosphericCondition = AtmosphericCondition[accident.getClimatology().getAtmosphericCondition()];

            returnedAccidents.push(accidentSummary);
        }

        return new ResultList<AccidentSummary>(resultListAccidents.total, returnedAccidents);
    }
}
