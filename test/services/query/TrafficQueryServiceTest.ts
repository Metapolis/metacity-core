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

        esClient.setup((instance) => instance.search<AccidentJsonData>(TypeMoq.It.is((x: SearchParams) => true))).returns(() => Promise.resolve(mockAccident));

        const careAccidentDTOs: ResultList<CarAccidentDTO> = (await trafficQueryService.findTrafficAccidents(findTrafficAccidentsQuery));

        esClient.verify((instance) => instance.search(TypeMoq.It.isAny()), TypeMoq.Times.once());
    }
}

