import "reflect-metadata";
import { Client, SearchParams } from "elasticsearch";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { AbstractTestService } from "../inversify/AbstractTestService";
import { TrafficQueryService } from "../../../src/services/query/TrafficQueryService";
import { It, Mock, Times } from "moq.ts";
import { ContextApp } from "../../ContextApp";

/**
 * All test for traffic query service
 */
@suite
class TrafficQueryServiceTest extends AbstractTestService {

    /**
     * Test function find traffic accident
     */
    // @test
    private testFindTrafficAccident(): void {
        const trafficQueryService: TrafficQueryService = (ContextApp.container.get("TrafficQueryService") as TrafficQueryService);
        const esClient: Mock<Client> = (ContextApp.container.get("ESClientMock") as Mock<Client>);
        esClient.setup((instance) => instance.search(It.IsAny<SearchParams>())).returns({
            test: "WORKED"
        });
        trafficQueryService.findTrafficAccidents();
        esClient.verify((instance) => instance.search(It.IsAny<SearchParams>()), Times.Once());
    }

}

