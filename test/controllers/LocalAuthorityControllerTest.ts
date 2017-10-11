import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import {} from "../../src/persistence/domain/Circle";
import { CircleCommandService } from "../../src/services/command/CircleCommandService";
import { SaveCircleCommandDTO } from "../../src/services/command/dto/circle/SaveCircleCommandDTO";
import {NumberIdentifier} from "../../src/controllers/rest/model/common/NumberIdentifier";
import {SaveCircle} from "../../src/controllers/rest/model/circle/SaveCircle";
import {Labeled} from "../../src/common/Labeled";
import {IllegalArgumentError} from "../../src/common/error/IllegalArgumentError";
import { UpdateCircleCommandDTO } from "../../src/services/command/dto/circle/UpdateCircleCommandDTO";
import { CircleQueryService } from "../../src/services/query/CircleQueryService";
import { CircleDetails } from "../../src/controllers/rest/model/circle/CircleDetails";
import { Role } from "../../src/common/enum/Role";
import { CircleDTO } from "../../src/services/query/dto/circle/CircleDTO";
import { UserDTO } from "../../src/services/query/dto/circle/UserDTO";
import { TestUtils } from "../common/TestUtils";

/**
 * All test for circle creation
 */
@suite
export class LocalAuthorityControllerTest extends AbstractTestController {

    /**
     * Test function create localAuthority circle
     */
    @test
    public async testCreateLocalAuthorityCircle(): Promise<void> {

        const path: string = "/api/local-authorities/{accesskey}/circle";
        const accessKey: string = "starkindustries";
        const circleCommandService: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        // Hello im a rigid linter
        const circleIdentifier = 42;

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];
        circle.defaultCircle = true;

        circleCommandService.setup((instance: CircleCommandService) => instance.createCircle(TypeMoq.It.is((localAuthorityCircle: SaveCircleCommandDTO) => {
            let ret = localAuthorityCircle.getRoles().length === circle.roles.length;
            for (let i = 0; i < circle.roles.length; i++) {
                ret = ret && localAuthorityCircle.getRoles()[i] === circle.roles[i];
            }
            ret = ret && localAuthorityCircle.getName() === circle.name;
            ret = ret && localAuthorityCircle.isDefaultCircle() === circle.defaultCircle;
            ret = ret && localAuthorityCircle.getAccessKey() === accessKey;
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

        Chai.assert.equal(actual.identifier, circleIdentifier, "Expected same identifier");
    }

    @test
    public async testCreateLocalAuthorityCircleError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to create a circle
        const path: string = "/api/local-authorities/{accesskey}/circle";
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

    @test
    public async testUpdateLocalAuthorityCircle(): Promise<void> {
        const path: string = "/api/local-authorities/{accesskey}/circle/{circleid}";
        const accessKey: string = "starkindustries";
        const circleCommandService: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        const circleQueryService: TypeMoq.IMock<CircleQueryService> = (ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>);
        const circleIdentifier = 42;

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];
        circle.defaultCircle = true;

        circleQueryService.setup((instance) => instance.exists(circleIdentifier)).returns(() => Promise.resolve(true));

        const opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{accesskey}", accessKey).replace("{circleid}", String(circleIdentifier)),
            body: circle,
            json: true
        };

        await Request(opts);

        circleCommandService.verify((instance: CircleCommandService) => instance.updateCircle(TypeMoq.It.is((localAuthorityCircle: UpdateCircleCommandDTO) => {
            let ret = localAuthorityCircle.getRoles().length === circle.roles.length;
            for (let i = 0; i < circle.roles.length; i++) {
                ret = ret && localAuthorityCircle.getRoles()[i] === circle.roles[i];
            }
            ret = ret && localAuthorityCircle.getName() === circle.name;
            ret = ret && localAuthorityCircle.isDefaultCircle() === circle.defaultCircle;
            ret = ret && localAuthorityCircle.getAccessKey() === accessKey;
            ret = ret && localAuthorityCircle.getId() === circleIdentifier;
            return ret;
        })), TypeMoq.Times.exactly(1));

    }

    @test
    public async testUpdateLocalAuthorityCircleError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to update a circle
        const path: string = "/api/local-authorities/{accesskey}/circle/{circleid}";
        const circleCommandService: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        const circleQueryService: TypeMoq.IMock<CircleQueryService> = (ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>);
        const circleIdentifier = 42;
        const accessKey: string = "starkindustries";

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];

        const opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{accesskey}", accessKey).replace("{circleid}", String(circleIdentifier)),
            body: circle,
            json: true
        };

        circleQueryService.setup((instance) => instance.exists(circleIdentifier)).returns(() => Promise.resolve(false));

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        circleCommandService.setup((instance) => instance.updateCircle(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));
        circleQueryService.setup((instance) => instance.exists(circleIdentifier)).returns(() => Promise.resolve(true));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }
    @test
    public async testGetLocalAuthorityCircleDetails(): Promise<void> {
        // 403 not enough rights => role is not high enough to update a circle
        const path: string = "/api/local-authorities/{accesskey}/circle/{circleid}";
        const circleQueryService: TypeMoq.IMock<CircleQueryService> = (ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>);
        const circleIdentifier = 42;
        const localAuthorityId: number = 23;

        const mockUsers: UserDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockUser: UserDTO = new UserDTO();
            mockUser.setId(i);
            mockUser.setFirstName(TestUtils.randomString(8));
            mockUser.setLastName(TestUtils.randomString(8));
            mockUsers.push(mockUser);
        }

        const circleDTOMock: CircleDTO = new CircleDTO();
        circleDTOMock.setId(circleIdentifier);
        circleDTOMock.setRoles([Role.READ_ALL]);
        circleDTOMock.setName("michel");
        circleDTOMock.setDefaultCircle(true);
        circleDTOMock.setMembers(mockUsers);

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{accesskey}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            json: true
        };
        circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));
        circleQueryService.setup((instance) => instance.getCircle(circleIdentifier)).returns(() => Promise.resolve(circleDTOMock));

        const actual: CircleDetails = new CircleDetails();
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);
        });
        Chai.assert.equal(actual.id, circleDTOMock.getId(), "Expected same id");
        Chai.assert.equal(actual.name, circleDTOMock.getName(), "Expected same name");
        Chai.assert.deepEqual(actual.roles, circleDTOMock.getRoles(), "Expected same role");
        Chai.assert.equal(actual.defaultCircle, circleDTOMock.isDefaultCircle(), "Expected same circle default");
        Chai.assert.equal(actual.members.length, circleDTOMock.getMembers().length);
        for (let i = 0; i < circleDTOMock.getMembers().length; i++) {
            Chai.assert.equal(actual.members[i].id, circleDTOMock.getMembers()[i].getId());
            Chai.assert.equal(actual.members[i].firstName, circleDTOMock.getMembers()[i].getFirstName());
            Chai.assert.equal(actual.members[i].lastName, circleDTOMock.getMembers()[i].getLastName());
        }
    }
    @test
    public async testGetLocalAuthorityCircleDetailsError(): Promise<void> {
        // 403 not enough rights => role is not high enough to update a circle
        const path: string = "/api/local-authorities/{accesskey}/circle/{circleid}";
        const circleQueryService: TypeMoq.IMock<CircleQueryService> = (ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>);
        const circleIdentifier = 42;
        const localAuthorityId: number = 23;

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{accesskey}", "toto").replace("{circleid}", String(circleIdentifier)),
            json: true
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));
        circleQueryService.setup((instance) => instance.getCircle(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));

        opts.uri = AbstractTestController.getBackend() + path.replace("{accesskey}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

    }
}
