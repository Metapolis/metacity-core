import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import {  } from "../../src/persistence/domain/ActivityCircle";
import { CircleCommandService } from "../../src/services/command/CircleCommandService";
import { SaveCircleCommandDTO } from "../../src/services/command/dto/circles/SaveCircleCommandDTO";
import {NumberIdentifier} from "../../src/controllers/rest/model/common/NumberIdentifier";
import {SaveCircle} from "../../src/controllers/rest/model/circle/SaveCircle";
import {Labeled} from "../../src/common/Labeled";
import {isNullOrUndefined} from "util";
import {IllegalArgumentError} from "../../src/common/error/IllegalArgumentError";
import circle = L.circle;

/**
 * All test for circle creation
 */
@suite
export class CollectivityControllerTest extends AbstractTestController {

    /**
     * Test function create collectivity circle
     */
    @test
    public async testCreateCollectivityCircle(): Promise<void> {

        const path: string = "/api/collectivities/{accesskey}/circles";
        const accessKey: string = "starkindustries";
        const circleCommandService: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        // Hello im a rigid linter
        const circleIdentifier = 42;

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];
        circle.description = "Il va de ville en ville";
        circle.avatarURL = "Pour vendre des velux";

        circleCommandService.setup((instance: CircleCommandService) => instance.createCircle(TypeMoq.It.is((collectivityCircle: SaveCircleCommandDTO) => {
            let ret = collectivityCircle.getDescription() === circle.description;
            ret = ret && collectivityCircle.getRoles().length === circle.roles.length;
            for (let i = 0; i < circle.roles.length; i++) {
                ret = ret && collectivityCircle.getRoles()[i] === circle.roles[i];
            }
            ret = ret && collectivityCircle.getName() === circle.name;
            ret = ret && collectivityCircle.getAvatarURL() === circle.avatarURL;
            ret = ret && collectivityCircle.getAccessKey() === accessKey;
            return ret;
        }))).returns(() => Promise.resolve(circleIdentifier));

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path.replace("{accesskey}", accessKey),
            body: circle,
            json: true
        };

        const actual: NumberIdentifier = new NumberIdentifier(0);
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);

        });

        console.log(actual);
        Chai.assert.equal(actual.identifier, circleIdentifier, "Expected same identifier");

    }
    @test.only()
    public async testCreateCollectivityCircleError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to create a circle
        const path: string = "/api/collectivities/{accesskey}/circles";
        const circleCommandService: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: circle,
            json: true
        };

        circleCommandService.setup((instance) => instance.createCircle(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }
}
