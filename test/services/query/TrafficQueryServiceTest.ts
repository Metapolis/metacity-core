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

/**
 * All test for traffic query service
 */
@suite
class TrafficQueryServiceTest extends AbstractTestService {

    /**
     * Test function find traffic accident
     */
    @test
    private async testFindTrafficAccident(): Promise<void> {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);
        const esClient: TypeMoq.IMock<Client> = (ContextApp.container.get("ESClientMock") as TypeMoq.IMock<Client>);

        const findTrafficAccidentsQuery: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        findTrafficAccidentsQuery.setOffset(0);
        findTrafficAccidentsQuery.setLimit(20);

        const mockAccident: SearchResponseAccident = new SearchResponseAccident();
        Object.assign(mockAccident, AccidentData.accidents);

        esClient.setup((instance) => instance.search<AccidentJsonData>(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTrafficAccidentsQuery.getIndex();
            ret = ret && searchParams.type === findTrafficAccidentsQuery.getType();
            ret = ret && searchParams.size === findTrafficAccidentsQuery.getLimit();
            ret = ret && searchParams.from === findTrafficAccidentsQuery.getOffset();
            ret = ret && searchParams.body === undefined;

            return ret;
        }))).returns(() => Promise.resolve(mockAccident));

        const careAccidentDTOs: ResultList<CarAccidentDTO> = (await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery));

        for (let i = 0; i < AccidentData.accidents.hits.hits.length; i++) {
            const accidentJson: AccidentJsonData = new AccidentJsonData();
            Object.assign(accidentJson, AccidentData.accidents.hits.hits[i]._source);
            this.assertAccident(careAccidentDTOs.results[i], accidentJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.isAny()), TypeMoq.Times.once());
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

