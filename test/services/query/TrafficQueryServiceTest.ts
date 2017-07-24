import "reflect-metadata";
import { Client, SearchParams } from "elasticsearch";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { AbstractTestService } from "../inversify/AbstractTestService";
import { TrafficQueryService } from "../../../src/services/query/TrafficQueryService";
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import { FindTrafficAccidentQuery } from "../../../src/common/query/FindTrafficAccidentQuery";
import SearchResponse = Elasticsearch.SearchResponse;
import { AccidentData } from "./elastic/AccidentData";
import { CarAccidentDTO } from "../../../src/services/query/dto/accident/CarAccidentDTO";
import { ResultList } from "../../../src/common/ResultList";
import { SearchResponseAccident } from "./elastic/SearchResponseAccident";
import { AccidentJsonData } from "./elastic/documents/AccidentJsonData";
import { CollisionType } from "../../../src/common/enum/accident/CollisionType";
import { Luminosity } from "../../../src/common/enum/accident/Luminosity";
import { AtmosphericCondition } from "../../../src/common/enum/accident/AtmosphericCondition";
import * as Chai from "chai";
import { LogicalQueryCriteria } from "../../../src/common/query/LogicalQueryCriteria";
import { GeoShape } from "../../../src/common/GeoShape";
import { LocationPoint } from "../../../src/common/LocationPoint";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";

/**
 * All test for traffic query service
 */
@suite
class TrafficQueryServiceTest extends AbstractTestService {

    /**
     * Test function find traffic accident
     */
    @test
    private async testFindTrafficAccidents(): Promise<void> {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);
        const esClient: TypeMoq.IMock<Client> = (ContextApp.container.get("ESClientMock") as TypeMoq.IMock<Client>);

        const findTrafficAccidentsQuery: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        findTrafficAccidentsQuery.setOffset(0);
        findTrafficAccidentsQuery.setLimit(20);

        const mockAccident: SearchResponseAccident = new SearchResponseAccident();
        Object.assign(mockAccident, AccidentData.accidents);

        esClient.setup((instance) => instance.search<AccidentJsonData>(TypeMoq.It.isAny())).returns(() => Promise.resolve(mockAccident));

        let careAccidentDTOs: ResultList<CarAccidentDTO> = (await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery));

        for (let i = 0; i < AccidentData.accidents.hits.hits.length; i++) {
            const accidentJson: AccidentJsonData = new AccidentJsonData();
            Object.assign(accidentJson, AccidentData.accidents.hits.hits[i]._source);
            this.assertAccident(careAccidentDTOs.results[i], accidentJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTrafficAccidentsQuery.getIndex();
            ret = ret && searchParams.type === findTrafficAccidentsQuery.getType();
            ret = ret && searchParams.size === findTrafficAccidentsQuery.getLimit();
            ret = ret && searchParams.from === findTrafficAccidentsQuery.getOffset();
            ret = ret && searchParams.body === undefined;

            return ret;
        })), TypeMoq.Times.once());

        // With geo shape in query
        // Just Must
        const mustGeoShape: GeoShape[] = [];
        mustGeoShape.push(new GeoShape(new LocationPoint(1, 2), new LocationPoint(3, 4)));
        mustGeoShape.push(new GeoShape(new LocationPoint(5, 2), new LocationPoint(7, 4)));
        findTrafficAccidentsQuery.setGeoFilter(new LogicalQueryCriteria<GeoShape>(mustGeoShape, []));
        careAccidentDTOs = (await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery));

        for (let i = 0; i < AccidentData.accidents.hits.hits.length; i++) {
            const accidentJson: AccidentJsonData = new AccidentJsonData();
            Object.assign(accidentJson, AccidentData.accidents.hits.hits[i]._source);
            this.assertAccident(careAccidentDTOs.results[i], accidentJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTrafficAccidentsQuery.getIndex();
            ret = ret && searchParams.type === findTrafficAccidentsQuery.getType();
            ret = ret && searchParams.size === findTrafficAccidentsQuery.getLimit();
            ret = ret && searchParams.from === findTrafficAccidentsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[2,1],\"bottom_right\":[4,3]}}},{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[2,5],\"bottom_right\":[4,7]}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Just should
        const shouldGeoShape: GeoShape[] = [];
        shouldGeoShape.push(new GeoShape(new LocationPoint(3, 6), new LocationPoint(8, 3)));
        shouldGeoShape.push(new GeoShape(new LocationPoint(2, 7), new LocationPoint(9, 2)));
        findTrafficAccidentsQuery.setGeoFilter(new LogicalQueryCriteria<GeoShape>([], shouldGeoShape));
        careAccidentDTOs = (await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery));

        for (let i = 0; i < AccidentData.accidents.hits.hits.length; i++) {
            const accidentJson: AccidentJsonData = new AccidentJsonData();
            Object.assign(accidentJson, AccidentData.accidents.hits.hits[i]._source);
            this.assertAccident(careAccidentDTOs.results[i], accidentJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTrafficAccidentsQuery.getIndex();
            ret = ret && searchParams.type === findTrafficAccidentsQuery.getType();
            ret = ret && searchParams.size === findTrafficAccidentsQuery.getLimit();
            ret = ret && searchParams.from === findTrafficAccidentsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"should\": [{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[6,3],\"bottom_right\":[3,8]}}},{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[7,2],\"bottom_right\":[2,9]}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Should and must
        findTrafficAccidentsQuery.setGeoFilter(new LogicalQueryCriteria<GeoShape>(mustGeoShape, shouldGeoShape));
        careAccidentDTOs = (await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery));

        for (let i = 0; i < AccidentData.accidents.hits.hits.length; i++) {
            const accidentJson: AccidentJsonData = new AccidentJsonData();
            Object.assign(accidentJson, AccidentData.accidents.hits.hits[i]._source);
            this.assertAccident(careAccidentDTOs.results[i], accidentJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTrafficAccidentsQuery.getIndex();
            ret = ret && searchParams.type === findTrafficAccidentsQuery.getType();
            ret = ret && searchParams.size === findTrafficAccidentsQuery.getLimit();
            ret = ret && searchParams.from === findTrafficAccidentsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[2,1],\"bottom_right\":[4,3]}}},{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[2,5],\"bottom_right\":[4,7]}}}]\"should\": [{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[6,3],\"bottom_right\":[3,8]}}},{\"geo_bounding_box\" : {\"latLon\": {\"top_left\":[7,2],\"bottom_right\":[2,9]}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());
    }

    @test
    private async testFindTrafficAccidentsQueryNull() {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);

        await trafficQueryService.findTrafficAccidents(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Query cannot be null");
        });
    }

    @test
    private async testFindTrafficAccidentsQueryOffsetNull() {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);

        const findTrafficAccidentsQuery: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        findTrafficAccidentsQuery.setOffset(null);

        await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset must be set");
        });
    }

    @test
    private async testFindTrafficAccidentsQueryOffsetNegative() {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);

        const findTrafficAccidentsQuery: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        findTrafficAccidentsQuery.setOffset(-1);

        await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset cannot be negative");
        });
    }

    @test
    private async testFindTrafficAccidentsQueryLimitNull() {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);

        const findTrafficAccidentsQuery: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        findTrafficAccidentsQuery.setLimit(null);

        await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be set");
        });
    }

    @test
    private async testFindTrafficAccidentsQueryLimitZero() {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);

        const findTrafficAccidentsQuery: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        findTrafficAccidentsQuery.setLimit(0);

        await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be superior to zero");
        });
    }

    /**
     * Check equality into elastic search stocked accident and accident dto
     * @param actual
     * @param expected
     */
    private assertAccident(actual: CarAccidentDTO, expected: AccidentJsonData) {
        Chai.assert.equal(actual.getId(), expected.id, "Expected same identifier");
        Chai.assert.equal(actual.getTimestamp(), expected.timestamp, "Expected same timestamp");
        Chai.assert.equal(actual.getSources().length, expected.sources.length, "Expected same sources");
        for (let i = 0; i < expected.sources.length; i++) {
            Chai.assert.equal(actual.getSources()[i], expected.sources[i], "Expected same sources");
        }
        Chai.assert.isNotNull(actual.getLocation(), "Expected Location not null");
        Chai.assert.equal(CollisionType[actual.getCollisionType()], CollisionType[expected.collisionType], "Expected same collision type");
        if (expected.location.address !== undefined) {
            Chai.assert.equal(actual.getLocation().getAddress(), expected.location.address, "Expected same address");
        } else {
            Chai.assert.isUndefined(actual.getLocation().getAddress(), "Expected undefined");
        }
        Chai.assert.equal(actual.getLocation().getLongitude(), expected.location.longitude, "Expected same longitude");
        Chai.assert.equal(actual.getLocation().getLatitude(), expected.location.latitude, "Expected same latitude");

        Chai.assert.isNotNull(actual.getClimatology(), "Expected climatology not null");
        Chai.assert.equal(Luminosity[actual.getClimatology().getLuminosity()], Luminosity[expected.climatology.luminosity], "Expected same climatology luminosity");
        Chai.assert.equal(AtmosphericCondition[actual.getClimatology().getAtmosphericCondition()], AtmosphericCondition[expected.climatology.atmosphericCondition], "Expected same climatology atmospheric condition");
    }
}

