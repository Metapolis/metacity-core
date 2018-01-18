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

import { Client } from "elasticsearch";
import { inject, injectable } from "inversify";
import { TrafficQueryService } from "../TrafficQueryService";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { CarAccidentDTO } from "../dto/accident/CarAccidentDTO";
import { FindTrafficAccidentQuery } from "../../../common/query/FindTrafficAccidentQuery";
import { ResultList } from "../../../common/ResultList";
import { BoundingBoxQueryParam } from "../builder/elasticsearch/model/BoundingBoxQueryParam";
import { QueryBuilder } from "../builder/elasticsearch/QueryBuilder";
import { TermQueryParam } from "../builder/elasticsearch/model/TermQueryParam";
import { isNullOrUndefined } from "util";

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
        this.logger.info("Retrieve all tweets in elastic search");
        Utils.checkArgument(query != null, "Query cannot be null");
        Utils.checkArgument(query.getOffset() != null, "Offset must be set");
        Utils.checkArgument(query.getOffset() >= 0, "Offset cannot be negative");
        Utils.checkArgument(query.getLimit() != null, "Limit must be set");
        Utils.checkArgument(query.getLimit() > 0, "Limit must be superior to zero");

        // Create query builder
        const queryBuilder: QueryBuilder = new QueryBuilder();
        if (query.isSet()) {
            // Build geo shape filter
            if (!isNullOrUndefined(query.getGeoFilter())) {
                for (const geoShape of query.getGeoFilter().getMustParams()) {
                    queryBuilder.must(new BoundingBoxQueryParam("latLon", geoShape.getTopLeft(), geoShape.getBottomRight()));
                }
                for (const geoShape of query.getGeoFilter().getShouldParams()) {
                    queryBuilder.should(new BoundingBoxQueryParam("latLon", geoShape.getTopLeft(), geoShape.getBottomRight()));
                }
            }

            if (!isNullOrUndefined(query.getAtmosphericConditionFilter())) {
                for (const atmosphericCondition of query.getAtmosphericConditionFilter().getMustParams()) {
                    queryBuilder.must(new TermQueryParam("climatology.atmosphericCondition", atmosphericCondition));
                }
                for (const atmosphericCondition of query.getAtmosphericConditionFilter().getShouldParams()) {
                    queryBuilder.should(new TermQueryParam("climatology.atmosphericCondition", atmosphericCondition));
                }
            }

            if (!isNullOrUndefined(query.getCollisionTypeFilter())) {
                for (const collisionType of query.getCollisionTypeFilter().getMustParams()) {
                    queryBuilder.must(new TermQueryParam("collisionType", collisionType));
                }
                for (const collisionType of query.getCollisionTypeFilter().getShouldParams()) {
                    queryBuilder.should(new TermQueryParam("collisionType", collisionType));
                }
            }

            if (!isNullOrUndefined(query.getLuminosityFilter())) {
                for (const luminosity of query.getLuminosityFilter().getMustParams()) {
                    queryBuilder.must(new TermQueryParam("climatology.luminosity", luminosity));
                }
                for (const luminosity of query.getLuminosityFilter().getShouldParams()) {
                    queryBuilder.should(new TermQueryParam("climatology.luminosity", luminosity));
                }
            }
            this.logger.info("Query elastic : '%s'", queryBuilder.build());
        } else {
            queryBuilder.matchAllQuery();
        }

        // Call elastic search
        const jsonAccidents = (await this.esClient.search({
            index: query.getIndex(),
            type: query.getType(),
            size: query.getLimit(),
            from: query.getOffset(),
            body: queryBuilder.build()
        })).hits;

        // Build dto list
        // TODO create document object with public field to simple parse the json from ElasticSearch
        const accidents: CarAccidentDTO[] = [];
        for (const jsonAccident of jsonAccidents.hits) {
            accidents.push(new CarAccidentDTO(jsonAccident._source));
        }

        return new ResultList<CarAccidentDTO>(jsonAccidents.total, accidents);
    }
}
