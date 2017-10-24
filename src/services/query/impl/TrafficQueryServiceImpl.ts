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
            if (query.getGeoFilter()) {
                for (const geoShape of query.getGeoFilter().getMustParams()) {
                    queryBuilder.must(new BoundingBoxQueryParam("latLon", geoShape.getTopLeft(), geoShape.getBottomRight()));
                }
                for (const geoShape of query.getGeoFilter().getShouldParams()) {
                    queryBuilder.should(new BoundingBoxQueryParam("latLon", geoShape.getTopLeft(), geoShape.getBottomRight()));
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
        const accidents: CarAccidentDTO[] = [];
        for (const jsonAccident of jsonAccidents.hits) {
            accidents.push(new CarAccidentDTO(jsonAccident._source));
        }

        return new ResultList<CarAccidentDTO>(jsonAccidents.total, accidents);
    }
}
