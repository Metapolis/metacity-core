import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { TrafficQueryService } from "../../src/services/query/TrafficQueryService";
import { Mock } from "moq.ts";
import { ContextApp } from "../ContextApp";

// TODO delete
// Temporary waiting working code
class Test {
    public test: string;
}

/**
 * All test for traffic query service
 */
@suite
class IndexControllerTest extends AbstractTestController {

    /**
     * Test function find traffic accident
     */
    @test
    private async testFindTraffic(): Promise<void> {
        const path: string = "/foo";
        const trafficQueryService: Mock<TrafficQueryService> = (ContextApp.container.get("TrafficQueryServiceMock") as Mock<TrafficQueryService>);
        trafficQueryService.setup((instance) => instance.findTrafficAccidents()).returns({
            test: "WORKED"
        });

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path
        };

        let responseValue: string = "";
        await Request(opts).then((data: string) => {
            responseValue += data;
        });

        const expected: Test = JSON.parse('{ "test": "WORKED"}');
        const actual: Test = JSON.parse(responseValue);

        Chai.assert.equal(actual.test, expected.test, "Expect the same content");
    }

}
