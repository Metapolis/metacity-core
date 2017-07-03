import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import * as FS from "fs"
import * as Path from "path";
import ErrnoException = NodeJS.ErrnoException;

/**
 * All test for index controller
 */
@suite
class IndexControllerTest extends AbstractTestController {

    /**
     * Test function find traffic accident
     */
    @test
    private async testIndex(): Promise<void> {
        const path: string = "/";

        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
        };

        // Check with a standard call
        let responseValue: string = "";
        await Request(opts).then((data: string) => {
            responseValue += data;
        });
        const expectedFile: string = await FS.readFileSync(Path.join(__dirname, "../../../client/src/index.html"), "utf8");

        Chai.assert.equal(responseValue, expectedFile, "Expected same file");
    }
}
